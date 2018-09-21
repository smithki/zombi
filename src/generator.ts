// --- Imports -------------------------------------------------------------- //

// Node modules
import chalk from 'chalk';
import { merge, uniq } from 'lodash';
import { resolve } from 'path';
import * as prettyTime from 'pretty-time';
import { of } from 'rxjs/observable/of';

// Local modules
import { FileSystem } from './fs';
import { log, setSilent } from './utils/log';
import { normalizeGeneratorName } from './utils/normalize-generator-name';
import {
  resolveTemplateRoot,
  ResolveTemplateRootDepth,
} from './utils/resolve-template-root';

// Types
import { GeneratorConfig, GeneratorOutput, Operator, Stream } from './types';

// --- Logic ---------------------------------------------------------------- //

const { cyan, green, yellow, gray } = chalk;

/**
 * Creates a new generator.
 */
export class Generator<Props> {
  // --- Properties --- //

  // Config properties
  public name: string;
  public templateRoot: string | boolean;
  public destinationRoot: string;
  public force: boolean;

  private zombi$: Stream<Props>;

  // --- Constructor --- //

  /**
   * Instantiate a Generator.
   *
   * @param config
   */
  constructor(config: GeneratorConfig<Props> = {}) {
    const { name, templateRoot, destinationRoot, force, silent } = config;

    // Assign attributes
    this.name = normalizeGeneratorName(name);
    this.destinationRoot = destinationRoot || process.cwd();
    this.templateRoot = resolveTemplateRoot(
      ResolveTemplateRootDepth.FromGenerator,
      templateRoot,
    );
    this.force = force;

    // Silence logs if so desired.
    if (silent) setSilent(silent);

    // Create the generator
    const generator: GeneratorOutput<Partial<Props>> = {
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
      fs: undefined,
    };

    generator.fs = new FileSystem(generator);

    // Create observable from generator
    this.zombi$ = of(generator as any);
  }

  // --- Public methods --- //

  /**
   * Create a sequence of tasks by chaining Zombi operators together.
   *
   * @param operators Zombi operators that will run in sequence.
   */
  public sequence(...operators: Operator<Props>[]): Generator<Props> {
    const result = (this.zombi$.pipe as any)(...operators);
    return merge({}, this, { zombi$: result });
  }

  // tslint:disable:prettier
  public compose(): Generator<Props>
  public compose<Z1>(z1: Generator<Z1>): Generator<Props & Z1>;
  public compose<Z1, Z2>(z1: Generator<Z1>, z2: Generator<Z2>): Generator<Props & Z1 & Z2>;
  public compose<Z1, Z2, Z3>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>): Generator<Props & Z1 & Z2 & Z3>;
  public compose<Z1, Z2, Z3, Z4>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>): Generator<Props & Z1 & Z2 & Z3 & Z4>;
  public compose<Z1, Z2, Z3, Z4, Z5>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z5>, z5: Generator<Z5>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>, z8: Generator<Z8>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>, z8: Generator<Z8>, z9: Generator<Z9>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;
  public compose(...zombis: Generator<any>[]): Generator<any>
  // tslint:enable:prettier

  /**
   * Create a new Zombi generator that composes other generators.
   *
   * @param {...Generator<any>[]} zombis The other generators to compose.
   * @returns {Generator<any>}
   * @memberof Generator
   */
  public compose(...zombis: Generator<any>[]): Generator<any> {
    if (!zombis.length) return this;

    let result;

    const target = merge({}, this.zombi$);

    const s = target.subscribe(g => {
      result = g;
    });

    const doCompose = z => {
      const source = merge({}, z.zombi$);
      const s = source.subscribe(g => {
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
   * Execute this generator's sequence.
   *
   * @returns
   * @memberof Zombi
   */
  public async run() {
    log();
    log(green.bold('🧟‍  Zombi is running ') + cyan.bold(this.name));
    log();

    let startTime;
    let timeElapsed;

    await new Promise(resolve => {
      this.zombi$.subscribe(async g => {
        const { prompts, sequence } = g;

        if (!prompts.length && !sequence.length) {
          log(yellow.bold(`🤷  There's nothing to Generate.`));
          return;
        }

        // Execute prompts
        for (const task of prompts) await task(g);

        log();
        log(green.bold('🧠  Generating...'));
        log();

        startTime = process.hrtime();

        // Execute sequence
        for (const task of sequence) await task(g);

        timeElapsed = process.hrtime(startTime);

        resolve();
      });
    });

    const prettyTimeElapsed = prettyTime(timeElapsed);

    log();
    log(
      green.bold(
        `⚡  It's aliiive! ${gray(`Generated in ${cyan(prettyTimeElapsed)}`)}`,
      ),
    );
    return;
  }

  /**
   * Clone this generator.
   */
  public clone() {
    return merge({}, this);
  }

  /**
   * Resolves a path to this generator's `templateRoot`.
   *
   * @param {...string[]} pathSegments Strings from which to resolve a path.
   * @returns
   * @memberof Zombi
   */
  public template(...pathSegments: string[]) {
    if (this.templateRoot) {
      return resolve(this.templateRoot as string, ...pathSegments);
    }
  }

  /**
   * Resolves a path to this generator's `destinationRoot`.
   *
   * @param {...string[]} pathSegments Strings from which to resolve a path.
   * @returns
   * @memberof Zombi
   */
  public destination(...pathSegments: string[]) {
    return resolve(this.destinationRoot, ...pathSegments);
  }
}
