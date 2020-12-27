/* eslint-disable prefer-const, no-param-reassign */

import { isValidElement, ReactElement } from 'react';
import treeWalker from 'react-ssr-prepass';
import { prompt as enquirer } from 'enquirer';
import prettyTime from 'pretty-time';
import Semaphore from 'semaphore-async-await';
import { assign, isBoolean } from 'lodash';
import ora, { Ora } from 'ora';
import chalk from 'chalk';
import { Effect } from './components/effect';
import { copy, FSOptions } from './fs';
import { createTimer, HrTime, Timer } from './utils/timer';
import { ensureArray, cleanArray } from './utils/array-helpers';
import { Zombi } from './components/zombi';
import { PromptWrapper } from './types';
import { createPromise } from './utils/create-promise';
import { Suspended } from './components/suspended';

const { gray, cyan, yellow, red } = chalk;

/**
 * Metadata for a successfully rendered side-effect.
 */
export interface EffectRenderSuccess extends Effect {
  status: 'fulfilled';
}

/**
 * Metadata for an unsuccessfully rendered side-effect.
 */
export interface EffectRenderFailed extends Effect {
  status: 'rejected';
  reason: any;
}

/**
 * A response containing metadata about the `scaffold`
 * operation that has completed.
 */
export interface ScaffoldResponse {
  effects: Array<EffectRenderSuccess | EffectRenderFailed>;
}

export interface ScaffoldOptions {
  quiet?: boolean;
}

/**
 * Renders the given scaffolding template.
 *
 * @param tree - The React tree describing the scaffold.
 */
export async function scaffold<Props>(tree: ReactElement<Props>, options?: ScaffoldOptions): Promise<ScaffoldResponse> {
  const shouldLog = !options?.quiet;

  const timer = createTimer();
  let timeElapsed: HrTime;

  timer.start();

  const name = await getScaffoldName(tree);
  console.log(gray('Running generator') + (name ? ` ${cyan.bold(name)}` : ''));

  const spinner = ora('Scaffolding');
  const prompt = createPromptWrapper(timer, spinner, options);

  if (shouldLog) spinner.start();

  const effects = await getScaffoldEffects(tree, prompt);

  return renderScaffold(effects, prompt).then(response => {
    timeElapsed = timer.stop();
    const prettyTimeElapsed = prettyTime(timeElapsed);

    const errors = response.filter(x => x.status === 'rejected') as PromiseRejectedResult[];

    if (shouldLog) {
      const logErrors = () => {
        console.error(red.underline.bold('\nEncountered the following errors:\n'));
        errors.forEach(({ reason }) => {
          console.error(reason);
          console.error(); // Line break between errors for aesthetics
        });
      };

      spinner.stop(); // Aesthetics!
      console.log(); // Aesthetics!

      if (!errors.length) {
        spinner.succeed(gray(`Generated in ${cyan.bold(prettyTimeElapsed)}`));
      } else if (errors.length === response.length) {
        spinner.fail(gray(`Something went wrong. ${chalk.bold('Nothing was generated.')}`));
        logErrors();
      } else if (errors.length) {
        spinner.warn(gray(`Generated, ${yellow('with some issues')}, in ${cyan.bold(prettyTimeElapsed)}`));
        logErrors();
      } else if (!response.length) {
        spinner.succeed(yellow(`🤷 There's nothing to generate...`));
      }
    }

    const effectsResult: ScaffoldResponse['effects'] = response.map((x, i) => {
      if (x.status === 'fulfilled') return { status: x.status, ...effects[i] };
      return { status: x.status, reason: x.reason, ...effects[i] };
    });

    return { effects: effectsResult };
  });
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

/**
 * Walks the given `tree` to parse the scaffold template and
 * prepares effects for  rendering by capturing user inputs.
 */
async function getScaffoldEffects(tree: ReactElement<any>, prompt: PromptWrapper) {
  let effects: Effect[] = [];

  await treeWalker(tree, async element => {
    if (isValidElement(element)) {
      switch (element.type) {
        case Effect:
          effects.push(element.props as Effect);
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

  return effects;
}

/**
 * Renders the output for side-effects given by `effects`.
 */
async function renderScaffold(effects: Effect[], prompt: PromptWrapper) {
  const effectPromises = effects.map(async e => {
    const options: FSOptions = {
      ...e.options,
      data: !isBoolean(e.options.data) && assign({}, e.options.data),
      prompt,
    };

    await copy(e.from, e.to, options);
    return { ...e, options };
  });

  return Promise.allSettled(effectPromises);
}

const promptLock = new Semaphore(1);

/**
 * We wrap `enquirer` under-the-hood for prompting user input.
 */
const createPromptWrapper = (
  timer: Timer,
  spinner: Ora,
  options?: ScaffoldOptions,
): PromptWrapper => async questions => {
  await promptLock.acquire();
  if (spinner.isSpinning && !options?.quiet) spinner.stop();
  timer.pause();

  const questionsArr = cleanArray(ensureArray(questions));
  const defaultAnswerName = questionsArr[0].name;

  if (!questionsArr.length) return Promise.resolve();

  if (!options?.quiet) console.log(); // Aesthetics!

  return enquirer(questionsArr as any).then((answers: any) => {
    const answersFormatted = questionsArr.length === 1 ? { [defaultAnswerName ?? 'default']: answers } : answers;
    timer.resume();
    if (!spinner.isSpinning && !options?.quiet) spinner.start();
    promptLock.signal();
    return answersFormatted;
  });
};
