/* eslint-disable prefer-const, no-param-reassign */

import { isValidElement, ReactElement } from 'react';
import treeWalker from 'react-ssr-prepass';
import { prompt as enquirer } from 'enquirer';
import prettyTime from 'pretty-time';
import Semaphore from 'semaphore-async-await';
import ora, { Ora } from 'ora';
import chalk from 'chalk';
import { assign, isFunction } from 'lodash';
import { Data as EjsData } from 'ejs';
import { Effect } from './components/effect';
import { copy, FSOptions } from './fs';
import { createTimer, HrTime, Timer } from './utils/timer';
import { ensureArray, cleanArray } from './utils/array-helpers';
import { Zombi } from './components/zombi';
import { Maybe, PromptWrapper, Questions } from './types';
import { createPromise } from './utils/create-promise';
import { Suspended } from './components/suspended';
import { UserCanceledPromptError } from './exceptions';

const { gray, cyan, yellow, red } = chalk;

/**
 * Metadata for a successfully rendered side-effect.
 */
export interface EffectRenderSuccess<T extends EjsData = EjsData> extends Effect<T & EjsData> {
  status: 'fulfilled';
}

/**
 * Metadata for an unsuccessfully rendered side-effect.
 */
export interface EffectRenderFailed<T extends EjsData = EjsData> extends Effect<T & EjsData> {
  status: 'rejected';
  reason: any;
}

/**
 * A response containing metadata about the `scaffold`
 * operation that has completed.
 */
export interface ScaffoldResponse<T extends Record<string, EjsData> = Record<string, EjsData>> {
  effects: Array<EffectRenderSuccess<T> | EffectRenderFailed<T>>;
  data: T;
}

/**
 * Options provided to the `scaffold` function.
 */
export interface ScaffoldOptions {
  /**
   * If `true`, all logging output from the `scaffold`
   * function will be suppressed.
   */
  quiet?: boolean;
}

/**
 * Renders the given scaffolding template.
 *
 * @param tree - The React tree describing the scaffold.
 */
export async function scaffold<T extends Record<string, EjsData>>(
  tree: ReactElement,
  options?: ScaffoldOptions,
): Promise<ScaffoldResponse<T>> {
  const shouldLog = !options?.quiet;

  const timer = createTimer();
  let timeElapsed: HrTime;

  timer.start();

  const name = await getScaffoldName(tree).catch(handleError());
  const spinner = ora('Scaffolding');
  const prompt = createPromptWrapper(timer, spinner, options);

  if (shouldLog) {
    console.log(gray('Running scaffold') + (name ? ` ${cyan.bold(name)}` : ''));
    spinner.start();
  }

  const { effects, globalData } = await getScaffoldEffects(tree, prompt).catch(handleError(spinner, options));

  return renderScaffold(effects, prompt)
    .then((response) => {
      timeElapsed = timer.stop();
      const prettyTimeElapsed = prettyTime(timeElapsed);

      const effectsResults: ScaffoldResponse['effects'] = response.map((x, i) => {
        if (x.status === 'fulfilled') return { status: x.status, ...effects[i] };
        return { status: x.status, reason: x.reason, ...effects[i] };
      });

      const errors = effectsResults.filter((x) => x.status === 'rejected') as EffectRenderFailed[];

      if (shouldLog) {
        const logErrors = () => {
          console.error(red.underline.bold('\nEncountered the following errors:\n'));
          errors.forEach(({ reason, from }) => {
            console.error(`Affected request: ${from}`);
            console.error(reason);
            console.error(); // Line break between errors for aesthetics
          });
        };

        spinner.stop(); // Aesthetics!
        if (prompt.count > 0) console.log(); // Aesthetics!

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

      return { effects: effectsResults, data: globalData } as any;
    })
    .catch(handleError(spinner, options));
}

/**
 * Close out the spinner before handling errors.
 *
 * NOTE: this excludes errors related to side effects,
 * which are not actually raised and therefore don't `catch`.
 */
function handleError(spinner?: Ora, options?: ScaffoldOptions) {
  return (reason?: any) => {
    if (spinner?.isSpinning && !options?.quiet) spinner.stop();
    return Promise.reject(reason);
  };
}

/**
 * Walks the given `tree` until we reach a `Zombi` element,
 * from which we can infer the scaffold's name.
 */
function getScaffoldName(tree: ReactElement<any>) {
  return createPromise<string | undefined>(async (resolve) => {
    await treeWalker(tree, (element) => {
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
  const effects: Effect[] = [];
  const globalData: any = {};

  await treeWalker(tree, async (element) => {
    if (isValidElement(element)) {
      switch (element.type) {
        case Effect:
          effects.push(element.props as Effect);
          break;

        case Zombi:
          if ((element.props as Zombi).prompts) {
            const questions = (element.props as Zombi).prompts;
            const answers = await prompt(questions, (element.props as Zombi).data);
            await (element.props as Zombi).onPromptResponse?.(answers);
            if (isFunction((element.props as any).children)) {
              Suspended.nodes.set((element.props as any).children, await (element.props as any).children(answers));
            }
            assign(globalData, { [(element.props as Zombi).name]: answers });
            Suspended.answers.set((element.props as any).children, answers);
          } else {
            assign(globalData, { [(element.props as Zombi).name]: { ...(element.props as Zombi).data } });
          }
          break;

        default:
          break;
      }
    }
  });

  return { effects, globalData };
}

/**
 * Renders the output for side-effects given by `effects`.
 */
async function renderScaffold(effects: Effect[], prompt: PromptWrapper) {
  const effectPromises = effects.map(async (e) => {
    const options: FSOptions = {
      ...e.options,
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
function createPromptWrapper(timer: Timer, spinner: Ora, options?: ScaffoldOptions): PromptWrapper {
  const wrappedPrompt: PromptWrapper = assign(
    async <T extends EjsData>(questions: Questions<T>, initialData: Maybe<T>) => {
      const doPrompt = async (theQuestions: any[]) => {
        await promptLock.acquire();

        if (spinner.isSpinning && !options?.quiet) spinner.stop();
        timer.pause();

        if (wrappedPrompt.count === 0 && !options?.quiet) console.log(); // Aesthetics!
        wrappedPrompt.count++;

        return enquirer(theQuestions)
          .then((answers: any) => {
            timer.resume();
            if (!spinner.isSpinning && !options?.quiet) spinner.start();
            promptLock.signal();
            return answers;
          })
          .catch(() => Promise.reject(UserCanceledPromptError));
      };

      const answers: any = { ...initialData };

      for (const questionOrFactory of cleanArray(ensureArray(questions))) {
        if (isFunction(questionOrFactory)) {
          const questionsFromFactory = questionOrFactory(answers);
          const res = await doPrompt(
            cleanArray(ensureArray(questionsFromFactory)).filter((q) => answers[q.name] == null),
          );
          assign(answers, res);
        } else if (answers[questionOrFactory.name] == null) {
          const res = await doPrompt([questionOrFactory]);
          assign(answers, res);
        }
      }

      return answers;
    },

    { count: 0 },
  );

  return wrappedPrompt;
}
