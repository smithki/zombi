import { Listr, ListrTaskWrapper } from 'listr2';
import { DefaultRenderer } from 'listr2/dist/renderer/default.renderer';
import { isArray, isBoolean, merge, uniq } from 'lodash';
import { resolve } from 'path';
import prettyTime from 'pretty-time';
import { of } from 'rxjs';
import Semaphore from 'semaphore-async-await';
import util from 'util';
import { FileSystem } from './fs';
import { endParallelism, startParallelism } from './operators/parallelism';
import { prompt } from './operators/prompt';
import {
  GeneratorConfig,
  GeneratorData,
  GeneratorOutput,
  GeneratorStream,
  Question,
  RequiredOnly,
  SideEffect,
  Tools,
  ZombiSideEffectOperator,
} from './types';
import { ensureArray } from './utils/ensure-array';
import { log } from './utils/log';
import { normalizeGeneratorName } from './utils/normalize-generator-name';
import { resolveDataBuilder } from './utils/resolve-data';
import { resolveTemplateRoot } from './utils/resolve-template-root';
import { timer } from './utils/timer';

/**
 * A class representing the `zombi` generator interface.
 */
export class Generator<Props> {
  // Config properties
  public name: string;
  public templateRoot: string | undefined;
  public destinationRoot: string;
  public force: boolean;

  // Stores the underlying RxJS Observable.
  private zombi$: GeneratorStream<Props>;

  /**
   * Instantiates a Generator.
   *
   * @param config
   */
  constructor(config: GeneratorConfig<Props> = {}) {
    const { name, templateRoot, destinationRoot, force } = config;

    // Assign attributes
    this.name = normalizeGeneratorName(name);
    this.destinationRoot = destinationRoot || process.cwd();
    this.templateRoot = resolveTemplateRoot(templateRoot);
    this.force = force || false;

    const g: GeneratorOutput<Partial<Props>> = {
      context: {
        name: this.name,
        templateRoot: this.templateRoot,
        destinationRoot: this.destinationRoot,
        template: this.template,
        destination: this.destination,
        force: this.force,
      },

      props: config.initialProps || {},
      prompts: [],
      sequence: [],
    };

    this.zombi$ = of(g as any);
  }

  /**
   * A wrapper for [Inquirer's prompt API](https://github.com/SBoudrias/Inquirer.js/#methods).
   * Prompts for user input and saves the resulting data into props.
   *
   * @param questions - Array of Inquirer-compatible
   * [question](https://github.com/SBoudrias/Inquirer.js/#question) objects.
   */
  public prompt<PropsExtensions = unknown>(
    questions: GeneratorData<
      Question<RequiredOnly<Props & PropsExtensions>> | Question<RequiredOnly<Props & PropsExtensions>>[],
      Props
    >,
  ): Generator<Props & PropsExtensions> {
    const result = (this.zombi$.pipe as any)(prompt(questions));
    return (merge({}, this, { zombi$: result }) as unknown) as Generator<Props & PropsExtensions>;
  }

  /**
   * Create a sequence of tasks by chaining operators together.
   *
   * @param operators - Operators that will run _in sequence_.
   */
  public sequence(...operators: ZombiSideEffectOperator<Props>[]): Generator<Props> {
    const result = (this.zombi$.pipe as any)(...operators);
    return merge({}, this, { zombi$: result });
  }

  /**
   * Create a _parallel_ sequence of tasks by chaining operators together.
   *
   * @param operators - Operators that will run _in parallel_.
   */
  public parallel(...operators: ZombiSideEffectOperator<Props>[]): Generator<Props> {
    const result = (this.zombi$.pipe as any)(startParallelism(), ...operators, endParallelism());
    // delete Generator[parallelismId];
    return merge({}, this, { zombi$: result });
  }

  // tslint:disable:prettier
  public compose(): Generator<Props>;
  public compose<Z1>(z1: Generator<Z1>): Generator<Props & Z1>;
  public compose<Z1, Z2>(z1: Generator<Z1>, z2: Generator<Z2>): Generator<Props & Z1 & Z2>;
  public compose<Z1, Z2, Z3>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>): Generator<Props & Z1 & Z2 & Z3>;
  public compose<Z1, Z2, Z3, Z4>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z4>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4>;
  public compose<Z1, Z2, Z3, Z4, Z5>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z5>,
    z5: Generator<Z5>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z4>,
    z5: Generator<Z5>,
    z6: Generator<Z6>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z4>,
    z5: Generator<Z5>,
    z6: Generator<Z6>,
    z7: Generator<Z7>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z4>,
    z5: Generator<Z5>,
    z6: Generator<Z6>,
    z7: Generator<Z7>,
    z8: Generator<Z8>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(
    z1: Generator<Z1>,
    z2: Generator<Z2>,
    z3: Generator<Z3>,
    z4: Generator<Z4>,
    z5: Generator<Z5>,
    z6: Generator<Z6>,
    z7: Generator<Z7>,
    z8: Generator<Z8>,
    z9: Generator<Z9>,
  ): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;
  // tslint:enable:prettier

  /**
   * Create a new Zombi generator that composes other generators.
   *
   * @param {...Generator<any>[]} zombis - The other generators to compose.
   * @returns {Generator<any>}
   */
  public compose(...zombis: Generator<any>[]): Generator<any> {
    if (!zombis.length) return this;

    let result: GeneratorOutput<any>;

    const target = merge({}, this.zombi$);
    target.subscribe(g => {
      result = g;
    });

    const doCompose = (z: Generator<any>) => {
      const source = merge({}, z.zombi$);
      source.subscribe((g: GeneratorOutput<any>) => {
        result.prompts.push(...g.prompts);
        result.sequence.push(...g.sequence);
      });
    };

    for (const z of zombis) {
      // Grab a clone so we don't mutate the zombi being composed.
      const clone = z.clone();
      if (clone) doCompose(clone);
    }

    result.prompts = uniq(result.prompts);
    result.sequence = uniq(result.sequence);

    return merge({}, this, { zombi$: of(result) });
  }

  /**
   * Execute the generator's task sequence and output side-effects.
   */
  public async run() {
    log.startMessage(this.name);
    let timeElapsed: [number, number];

    /* eslint-disable-next-line no-shadow */
    const didGenerateFiles = await new Promise(resolve => {
      this.zombi$.subscribe(async generator => {
        const { prompts, sequence } = generator;
        const listr = new Listr([]);

        if (!prompts.length && !sequence.length) {
          log.nothingToDoMessage();
          resolve(false);
          return;
        }

        const askLock = new Semaphore(1);

        /**
         * Builds contextual utility functions for the side-effect executors.
         */
        const getTools = (t: ListrTaskWrapper<any, typeof DefaultRenderer>): Tools<Props> => ({
          get fs() {
            return new FileSystem<Props>(generator, this);
          },

          status: (message, ...messages) => {
            /* eslint-disable-next-line no-param-reassign */
            t.output = util.format(message, ...messages);
          },

          ask: async questions => {
            await askLock.acquire();
            timer.pause();

            const questionsArr = ensureArray(questions);
            const defaultAnswerName = questionsArr[0].name;

            if (!questionsArr.length) return Promise.resolve();

            return t.prompt(questionsArr as any).then(answers => {
              const answersFormatted = questionsArr.length === 1 ? { [defaultAnswerName]: answers } : answers;

              timer.resume();

              askLock.signal();
              return answersFormatted;
            });
          },
        });

        /**
         * Executes a side-effect task if the configured conditional is truthy.
         */
        const executeSideEffect = async (
          sideEffect: SideEffect<Props>,
          t: ListrTaskWrapper<any, typeof DefaultRenderer>,
        ) => {
          const condition = await resolveDataBuilder(generator)(sideEffect.condition);
          if (isBoolean(condition) && condition) {
            await sideEffect(generator, getTools(t));
          }
        };

        listr.add({
          title: 'Setup',
          task: async (_, t) => {
            // Execute all prompting tasks
            for (const sideEffect of prompts) {
              await sideEffect(generator, getTools(t));
            }
          },
        });

        listr.add({
          title: 'Scaffolding',
          task: async (_, t) => {
            // Execute all side-effect tasks
            for (const sideEffect of sequence) {
              if (isArray(sideEffect)) {
                await Promise.all(sideEffect.map(se => executeSideEffect(se, t)));
              } else await executeSideEffect(sideEffect, t);
            }
          },
        });

        timer.start();
        await listr.run();
        timeElapsed = timer.stop();

        resolve(true);
      });
    });

    if (didGenerateFiles) {
      const prettyTimeElapsed = prettyTime(timeElapsed);
      log.completedMessage(prettyTimeElapsed);
    }
  }

  /**
   * Create a copy of the generator.
   */
  public clone() {
    return merge({}, this);
  }

  /**
   * Resolves a path to the generator's `templateRoot`.
   *
   * @param {...string[]} pathSegments - Strings from which to resolve a path.
   */
  public template(...pathSegments: string[]) {
    if (this.templateRoot) {
      return resolve(this.templateRoot, ...pathSegments);
    }
  }

  /**
   * Resolves a path to the generator's `destinationRoot`.
   *
   * @param {...string[]} pathSegments - Strings from which to resolve a path.
   */
  public destination(...pathSegments: string[]) {
    return resolve(this.destinationRoot, ...pathSegments);
  }
}
