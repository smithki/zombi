/* eslint-disable no-param-reassign */

import { isBoolean, isArray } from 'lodash';
import { Listr, ListrTaskWrapper } from 'listr2';
import Semaphore from 'semaphore-async-await';
import { DefaultRenderer } from 'listr2/dist/renderer/default.renderer';
import prettyTime from 'pretty-time';
import { createTimer, HrTime, Timer } from './utils/timer';
import { SideEffectUtils, SideEffect, ZombiStream, ZombiStreamOutput } from './types/core';
import { FileSystem } from './fs';
import { log } from './utils/log';
import { ensureArray } from './utils/array-helpers';
import { resolveDataBuilder } from './utils/resolve-data';
import { createPromise } from './utils/create-promise';

/**
 * Builds contextual utility functions for the side-effect executor.
 */
function utils<Props>(
  generator: ZombiStreamOutput<Props>,
  timer: Timer,
  promptLock: Semaphore,
  executor: ListrTaskWrapper<any, typeof DefaultRenderer>,
): SideEffectUtils<Props> {
  return {
    get fs() {
      return new FileSystem<Props>(generator, this);
    },

    statusIO: executor.stdout(),

    ask: async questions => {
      await promptLock.acquire();
      timer.pause();

      const questionsArr = ensureArray(questions);
      const defaultAnswerName = questionsArr[0].name;

      if (!questionsArr.length) return Promise.resolve();

      return executor.prompt(questionsArr as any).then(answers => {
        const answersFormatted = questionsArr.length === 1 ? { [defaultAnswerName]: answers } : answers;
        timer.resume();
        promptLock.signal();
        return answersFormatted;
      });
    },
  };
}

/**
 * Prompts for user input, then executes a series of effectful tasks attached to
 * the given `stream`.
 */
export async function runGenerator<Props>(name: string, stream: ZombiStream<Props>) {
  log.startMessage(name);

  const timer = createTimer();
  let timeElapsed: HrTime;

  const { didGenerateFiles, props } = await createPromise<{ didGenerateFiles: boolean; props: Props }>(
    (resolve, reject) => {
      stream.subscribe(async generator => {
        const listr = new Listr([]);

        if (!generator.prompts.length && !generator.sequence.length) {
          log.nothingToDoMessage();
          resolve({ didGenerateFiles: false, props: { ...generator.props } });
          return;
        }

        const promptLock = new Semaphore(1);

        /**
         * Executes a side-effect task if the configured conditional is truthy.
         */
        const executeSideEffect = async (
          sideEffect: SideEffect<Props>,
          executor: ListrTaskWrapper<any, typeof DefaultRenderer>,
        ) => {
          const condition = await resolveDataBuilder(generator)(sideEffect.condition);

          if (isBoolean(condition) && condition) {
            const originalTitle = executor.title;
            if (sideEffect.label) executor.title = sideEffect.label;
            await sideEffect(generator, utils(generator, timer, promptLock, executor));
            executor.title = originalTitle;
          }
        };

        /**
         * Resolve the order or side effects based on
         * the `SideEffect.sort` property.
         */
        const sortEffects = <T extends Array<SideEffect<Props> | SideEffect<Props>[]>>(effects: T) => {
          return effects.sort((a, b) => {
            if (Array.isArray(a) || Array.isArray(b)) return 0;
            return (b.sort ?? 0) - (a.sort ?? 0);
          });
        };

        // Execute prompting tasks
        listr.add({
          title: 'Setup',
          task: async (_, executor) => {
            for (const prompt of sortEffects(generator.prompts)) {
              await executeSideEffect(prompt, executor);
            }
          },
        });

        // Execute effectful tasks
        listr.add({
          title: 'Scaffolding',
          task: async (_, executor) => {
            for (const sideEffect of sortEffects(generator.sequence)) {
              if (isArray(sideEffect)) {
                await Promise.all(sortEffects(sideEffect).map(se => executeSideEffect(se, executor)));
              } else await executeSideEffect(sideEffect, executor);
            }
          },
        });

        timer.start();
        await listr.run().catch(reject);
        timeElapsed = timer.stop();

        resolve({ didGenerateFiles: true, props: { ...generator.props } });
      });
    },
  );

  if (didGenerateFiles) {
    const prettyTimeElapsed = prettyTime(timeElapsed);
    log.completedMessage(prettyTimeElapsed);
  }

  return props;
}
