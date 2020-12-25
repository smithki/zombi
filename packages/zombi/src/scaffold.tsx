/* eslint-disable prefer-const, no-param-reassign */

import { isValidElement, ReactElement } from 'react';
import treeWalker from 'react-ssr-prepass';
import { Listr } from 'listr2';
import prettyTime from 'pretty-time';
import Semaphore from 'semaphore-async-await';
import { assign, isBoolean } from 'lodash';
import { Effect } from './components/effect';
import { copy, FSOptions } from './fs';
import { createTimer, HrTime, Timer } from './utils/timer';
import { logger } from './utils/logger';
import { ensureArray, cleanArray } from './utils/array-helpers';
import { Zombi } from './components/zombi';
import { PromptWrapper } from './types';
import { createPromise } from './utils/create-promise';
import { Suspended } from './components/suspended';

interface ScaffoldContext {
  effects: Effect[];
}

/**
 * Renders the given scaffolding template.
 *
 * @param tree - The React tree describing the scaffold.
 */
export async function scaffold<Props>(tree: ReactElement<Props>) {
  const timer = createTimer();
  let timeElapsed: HrTime;

  const taskRunner = new Listr<ScaffoldContext>([
    /**
     * The "Setup" task parses the template and prepares
     * for rendering by capturing user inputs.
     */
    {
      title: 'Setup',
      task: async (ctx, executor) => {
        const prompt = createPromptWrapper(executor.prompt.bind(executor), timer);

        await treeWalker(tree, async element => {
          if (isValidElement(element)) {
            switch (element.type) {
              case Effect:
                ctx.effects.push(element.props as Effect);
                break;

              case Zombi:
                if ((element.props as Zombi).prompts) {
                  const questions = (element.props as Zombi).prompts;
                  const answers = await prompt(questions);
                  Suspended.answers.set((element.props as any).children, answers);
                }
                break;

              default:
                break;
            }
          }
        });
      },
    },

    /**
     * The "Scaffolding" task outputs any side-effects
     * described by the scaffold template.
     */
    {
      title: 'Scaffolding',
      task: async (ctx, executor) => {
        const effectPromises = ctx.effects.map(e => {
          const options: FSOptions = {
            ...e.options,
            data: !isBoolean(e.options.data) && assign({}, e.options.data),
            prompt: createPromptWrapper(executor.prompt.bind(executor), timer),
          };

          return copy(e.from, e.to, options);
        });

        await Promise.all(effectPromises);
      },
    },
  ]);

  timer.start();
  logger.startMessage(await getScaffoldName(tree));
  const { effects } = await taskRunner.run({ effects: [] });
  timeElapsed = timer.stop();

  if (effects.length) {
    const prettyTimeElapsed = prettyTime(timeElapsed);
    logger.completedMessage(prettyTimeElapsed);
  } else {
    logger.nothingToDoMessage();
  }
}

/**
 * Walks the given `tree` until we reach a `Zombi` element,
 * from which we can infer the scaffold's name.
 */
function getScaffoldName(tree: ReactElement<any>) {
  return createPromise<string | undefined>(async resolve => {
    await treeWalker(tree, element => {
      if (isValidElement(element) && element.type === Zombi) {
        // Resolve with the top-level scaffold name.
        resolve((element.props as Zombi).name);

        // Bail out of `treeWalker`, we have what we came for!
        throw new Error();
      }
    }).finally(() => {
      // If no `Zombi` element was found, we'll just resolve `undefined`...
      resolve(undefined);
    });
  });
}

const promptLock = new Semaphore(1);

/**
 * We use `listr2` to run the scaffold, which wraps `enquirer` under-the-hood
 * for prompting user input. We have to wrap the prompt function once more,
 * though, to format the answers and provide better TypeScript support.
 */
const createPromptWrapper = (
  promptFn: (...args: any[]) => Promise<any>,
  timer: Timer,
): PromptWrapper => async questions => {
  await promptLock.acquire();
  timer.pause();

  const questionsArr = cleanArray(ensureArray(questions));
  const defaultAnswerName = questionsArr[0].name;

  if (!questionsArr.length) return Promise.resolve();

  return promptFn(questionsArr).then((answers: any) => {
    const answersFormatted = questionsArr.length === 1 ? { [defaultAnswerName ?? 'default']: answers } : answers;
    timer.resume();
    promptLock.signal();
    return answersFormatted;
  });
};
