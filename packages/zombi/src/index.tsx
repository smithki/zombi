/* eslint-disable prefer-const */

import { isValidElement, ReactElement } from 'react';
import treeWalker from 'react-ssr-prepass';
import { Listr } from 'listr2';
import prettyTime from 'pretty-time';
import Semaphore from 'semaphore-async-await';
import { Effect } from './components/effect';
import { copy, FSOptions } from './fs';
import { createTimer, HrTime } from './utils/timer';
import { logger } from './utils/logger';
import { ensureArray } from './utils/array-helpers';

const promptLock = new Semaphore(1);

export async function scaffold<Props>(tree: ReactElement<Props>) {
  const effects: Effect[] = [];

  await treeWalker(tree, (element, instance) => {
    if (isValidElement(element) && element.type === Effect) {
      effects.push(element.props as Effect);
    }
  });

  const timer = createTimer();
  let timeElapsed: HrTime;

  const taskRunner = new Listr([
    {
      title: 'Scaffolding',
      task: async (ctx, executor) => {
        const effectPromises = effects.map(e => {
          const options: FSOptions = {
            ...e.options,

            stdout: executor.stdout(),

            prompt: async questions => {
              await promptLock.acquire();
              timer.pause();

              const questionsArr = ensureArray(questions);
              const defaultAnswerName = questionsArr[0].name;

              if (!questionsArr.length) return Promise.resolve();

              return executor.prompt(questionsArr).then(answers => {
                const answersFormatted = questionsArr.length === 1 ? { [defaultAnswerName]: answers } : answers;
                timer.resume();
                promptLock.signal();
                return answersFormatted;
              });
            },
          };

          return copy(e.from, e.to, options);
        });

        await Promise.all(effectPromises);
      },
    },
  ]);

  timer.start();
  await taskRunner.run();
  timeElapsed = timer.stop();

  if (effects.length) {
    const prettyTimeElapsed = prettyTime(timeElapsed);
    logger.completedMessage(prettyTimeElapsed);
  } else {
    logger.nothingToDoMessage();
  }
}
