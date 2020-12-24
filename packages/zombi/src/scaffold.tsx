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
import { Zombi } from './components/zombi';

const promptLock = new Semaphore(1);

export async function scaffold<Props>(tree: ReactElement<Props>) {
  const scaffoldNames: string[] = [];
  const effects: Effect[] = [];

  await treeWalker(tree, element => {
    if (isValidElement(element)) {
      switch (element.type) {
        case Effect:
          effects.push(element.props as Effect);
          break;

        case Zombi:
          scaffoldNames.push((element.props as Zombi).name);
          break;

        default:
          break;
      }
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

              return (executor.prompt as any)(questionsArr).then((answers: any) => {
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
  logger.startMessage(scaffoldNames[0]);
  await taskRunner.run();
  timeElapsed = timer.stop();

  if (effects.length) {
    const prettyTimeElapsed = prettyTime(timeElapsed);
    logger.completedMessage(prettyTimeElapsed);
  } else {
    logger.nothingToDoMessage();
  }
}
