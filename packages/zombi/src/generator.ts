/* eslint-disable @typescript-eslint/ban-types */

import { merge, uniq } from 'lodash';
import { resolve } from 'path';
import { of } from 'rxjs';
import { endParallelism, startParallelism } from './operators/parallelism';
import { prompt } from './operators/prompt';
import {
  Configuration,
  Resolveable,
  ZombiStreamOutput,
  ZombiStream,
  Question,
  RequiredOnly,
  SideEffectOperator,
  Maybe,
} from './types';
import { normalizeGeneratorName } from './utils/normalize-generator-name';
import { resolveTemplateRoot } from './utils/resolve-template-root';
import { runGenerator } from './run';

/**
 * A class representing the `zombi` interface.
 */
export class Zombi<Props> {
  public name: string;
  public templateRoot: string | undefined;
  public destinationRoot: string;
  public clobber: boolean;
  private zombi$: ZombiStream<Props>;

  /**
   * Instantiates a `Zombi` generator.
   *
   * @param config
   */
  constructor(config: Configuration<Props> = {}) {
    const { name, templateRoot, destinationRoot, clobber } = config;

    // Assign attributes
    this.name = normalizeGeneratorName(name);
    this.destinationRoot = destinationRoot || process.cwd();
    this.templateRoot = resolveTemplateRoot(templateRoot);
    this.clobber = clobber || false;

    const g: ZombiStreamOutput<Partial<Props>> = {
      context: {
        name: this.name,
        templateRoot: this.templateRoot,
        destinationRoot: this.destinationRoot,
        template: this.template,
        destination: this.destination,
        clobber: this.clobber,
      },

      props: config.initialProps || {},
      prompts: [],
      sequence: [],
    };

    this.zombi$ = of(g as any);
  }

  /**
   * A wrapper for [Enquirer's prompt API](https://github.com/enquirer/enquirer#-prompts).
   * Prompts for user input and saves the resulting data into props.
   *
   * @param questions - Array of Enquirer-compatible
   * [question](https://github.com/enquirer/enquirer#prompt-options) objects.
   */
  public prompt<PropsExtensions = {}>(
    questions: Resolveable<
      Maybe<Question<RequiredOnly<Props & PropsExtensions>>> | Maybe<Question<RequiredOnly<Props & PropsExtensions>>>[],
      Props & PropsExtensions
    >,
  ): Zombi<Props & PropsExtensions> {
    const result = ((this as unknown) as Zombi<Props & PropsExtensions>).zombi$.pipe(prompt(questions));
    return (merge({}, this, { zombi$: result }) as unknown) as Zombi<Props & PropsExtensions>;
  }

  /**
   * Create a sequence of tasks by chaining operators together.
   *
   * @param operators - Operators that will run _in sequence_.
   */
  public sequence(...operators: SideEffectOperator<Props>[]): Zombi<Props> {
    const result = (this.zombi$.pipe as any)(...operators);
    return merge({}, this, { zombi$: result });
  }

  /**
   * Create a _parallel_ sequence of tasks by chaining operators together.
   *
   * @param operators - Operators that will run _in parallel_.
   */
  public parallel(...operators: SideEffectOperator<Props>[]): Zombi<Props> {
    const result = (this.zombi$.pipe as any)(startParallelism(), ...operators, endParallelism());
    // delete Generator[parallelismId];
    return merge({}, this, { zombi$: result });
  }

  /* eslint-disable prettier/prettier */
  public compose(): Zombi<Props>;
  public compose<Z1>(z1: Zombi<Z1>): Zombi<Props & Z1>;
  public compose<Z1, Z2>(z1: Zombi<Z1>, z2: Zombi<Z2>): Zombi<Props & Z1 & Z2>;
  public compose<Z1, Z2, Z3>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>): Zombi<Props & Z1 & Z2 & Z3>;
  public compose<Z1, Z2, Z3, Z4>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z4>): Zombi<Props & Z1 & Z2 & Z3 & Z4>;
  public compose<Z1, Z2, Z3, Z4, Z5>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z5>, z5: Zombi<Z5>): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z4>, z5: Zombi<Z5>, z6: Zombi<Z6>): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z4>, z5: Zombi<Z5>, z6: Zombi<Z6>, z7: Zombi<Z7>): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z4>, z5: Zombi<Z5>, z6: Zombi<Z6>, z7: Zombi<Z7>, z8: Zombi<Z8>): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(z1: Zombi<Z1>, z2: Zombi<Z2>, z3: Zombi<Z3>, z4: Zombi<Z4>, z5: Zombi<Z5>, z6: Zombi<Z6>, z7: Zombi<Z7>, z8: Zombi<Z8>, z9: Zombi<Z9>): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;
  /* eslint-enable prettier/prettier */

  /**
   * Create a new Zombi generator that composes other generators.
   *
   * @param {...Zombi<any>[]} zombis - The other generators to compose.
   * @returns {Zombi<any>}
   */
  public compose(...zombis: Zombi<any>[]): Zombi<any> {
    if (!zombis.length) return this;

    let result: ZombiStreamOutput<any>;

    const target = merge({}, this.zombi$);
    target.subscribe(g => {
      result = g;
    });

    const doCompose = (z: Zombi<any>) => {
      const source = merge({}, z.zombi$);
      source.subscribe((g: ZombiStreamOutput<any>) => {
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
    return runGenerator(this.name, this.zombi$);
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
