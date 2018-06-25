// Imports ---------------------------------------------------------------------

// Node modules
import * as caller from 'caller';
import chalk from 'chalk';
import { merge, uniq } from 'lodash';
import { resolve } from 'path';
import { of } from 'rxjs/observable/of';

// Local modules
import { createGeneratorName } from '../util/create-generator-name';
import { log, setSilent } from '../util/log';
import { resolveTemplateRoot } from '../util/resolve-template-root';

// Types
import { Callback, GeneratorOutput, Operator, Options, Stream } from '../types';

// Constants -------------------------------------------------------------------

const { cyan, green, yellow } = chalk;

// Logic -----------------------------------------------------------------------

/**
 * Creates a new generator.
 */
export class Generator<Props> {
  name: string;
  templateRoot: string | boolean;
  destinationRoot: string;
  zombi$: Stream<Props>;
  force: boolean;

  /**
   * Creates an instance of Zombi generator.
   *
   * @param options
   */
  constructor(options: Options<Props> = {}) {
    const { name, templateRoot, destinationRoot, force, silent } = options;

    // Assign attributes
    this.name = createGeneratorName(name);
    this.destinationRoot = destinationRoot || process.cwd();
    this.templateRoot = resolveTemplateRoot(3, templateRoot);
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

      props: options.initialProps || {},
      prompts: [],
      sequence: [],
    };

    // Create observable from generator
    this.zombi$ = of(generator as any);
  }

  /**
   * Create a sequence of tasks by chaining Zombi operators together.
   *
   * @param operators Zombi operators that will run in sequence.
   */
  sequence(...operators: Operator<Props>[]): Generator<Props> {
    const result = (this.zombi$.pipe as any)(...operators);
    return merge({}, this, { zombi$: result });
  }

  // tslint:disable:prettier
  compose(): Generator<Props>
  compose<Z1>(z1: Generator<Z1>): Generator<Props & Z1>;
  compose<Z1, Z2>(z1: Generator<Z1>, z2: Generator<Z2>): Generator<Props & Z1 & Z2>;
  compose<Z1, Z2, Z3>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>): Generator<Props & Z1 & Z2 & Z3>;
  compose<Z1, Z2, Z3, Z4>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>): Generator<Props & Z1 & Z2 & Z3 & Z4>;
  compose<Z1, Z2, Z3, Z4, Z5>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z5>, z5: Generator<Z5>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  compose<Z1, Z2, Z3, Z4, Z5, Z6>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>, z8: Generator<Z8>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(z1: Generator<Z1>, z2: Generator<Z2>, z3: Generator<Z3>, z4: Generator<Z4>, z5: Generator<Z5>, z6: Generator<Z6>, z7: Generator<Z7>, z8: Generator<Z8>, z9: Generator<Z9>): Generator<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;
  compose(...zombis: Generator<any>[]): Generator<any>;
  // tslint:enable:prettier

  /**
   * Create a new Zombi generator that composes other generators.
   *
   * @param {...Generator<any>[]} zombis The other generators to compose.
   * @returns {Generator<any>}
   * @memberof Generator
   */
  compose(...zombis: Generator<any>[]): Generator<any> {
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
   * Runs a generator.
   *
   * @returns
   * @memberof Zombi
   */
  async run() {
    log();
    log(green.bold('🧟‍  Zombi is running ') + cyan.bold(this.name));
    log();

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

        // Execute sequence
        for (const task of sequence) await task(g);
        resolve();
      });
    });

    log();
    log(green.bold(`⚡  It's aliiive!`));
    return;
  }

  /**
   * Clones a generator
   */
  clone() {
    return merge({}, this);
  }

  /**
   * Resolves a path to this generator's `templateRoot`.
   *
   * @param {...string[]} pathSegments Strings from which to resolve a path.
   * @returns
   * @memberof Zombi
   */
  template(...pathSegments: string[]) {
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
  destination(...pathSegments: string[]) {
    return resolve(this.destinationRoot, ...pathSegments);
  }
}
