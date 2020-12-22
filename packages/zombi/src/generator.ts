/* eslint-disable @typescript-eslint/ban-types */

import { isBoolean, isFunction, merge, uniq } from 'lodash';
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
  SideEffectOperator,
  SideEffectContext,
  SideEffect,
} from './types/core';
import { Maybe } from './types/utility';
import { normalizeGeneratorName } from './utils/normalize-generator-name';
import { resolveTemplateRoot } from './utils/resolve-template-root';
import { runGenerator } from './run';
import { ensureArray } from './utils/array-helpers';
import { resolveDataBuilder } from './utils/resolve-data';

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
        resolveTemplate: this.resolveTemplate,
        resolveDestination: this.resolveDestination,
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
    questions:
      | Resolveable<Maybe<Question<Props & PropsExtensions>>, Props>
      | Resolveable<Maybe<Question<Props & PropsExtensions>>[], Props>,
  ): Zombi<Props & PropsExtensions> {
    const result = this.zombi$.pipe(
      // Purposely reduce the type to ignore `PropsExtensions`, as they would
      // only be applicable to follow-up prompts
      prompt(questions as Resolveable<Maybe<Question<Props>>, Props> | Resolveable<Maybe<Question<Props>>[], Props>),
    );
    return (merge({}, this, { zombi$: result }) as unknown) as Zombi<Props & PropsExtensions>;
  }

  /**
   * Create a sequence of tasks by chaining operators together.
   *
   * @param operators - Operators that will run _in sequence_.
   */
  public pipe(...operators: SideEffectOperator<Props>[]): Zombi<Props> {
    const result = (this.zombi$.pipe as any)(...operators);
    return merge({}, this, { zombi$: result });
  }

  /**
   * Create a _parallel_ task from the given operators.
   *
   * @param operators - Operators that will run _in parallel_.
   */
  public parallelPipe(...operators: SideEffectOperator<Props>[]): Zombi<Props> {
    const result = (this.zombi$.pipe as any)(startParallelism(), ...operators, endParallelism());
    return merge({}, this, { zombi$: result });
  }

  /* eslint-disable prettier/prettier */
  public compose<Z1>(zombis: Zombi<Z1> | [Zombi<Z1>]): Zombi<Props & Z1>;
  public compose<Z1, Z2>(zombis: [Zombi<Z1>, Zombi<Z2>]): Zombi<Props & Z1 & Z2>;
  public compose<Z1, Z2, Z3>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>]): Zombi<Props & Z1 & Z2 & Z3>;
  public compose<Z1, Z2, Z3, Z4>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>]): Zombi<Props & Z1 & Z2 & Z3 & Z4>;
  public compose<Z1, Z2, Z3, Z4, Z5>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z5>, Zombi<Z5>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>, Zombi<Z8>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>, Zombi<Z8>, Zombi<Z9>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;

  public compose<Z1>(condition: Resolveable<boolean, Props>, zombis: Zombi<Z1> | [Zombi<Z1>]): Zombi<Props & Z1>;
  public compose<Z1, Z2>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>]): Zombi<Props & Z1 & Z2>;
  public compose<Z1, Z2, Z3>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>]): Zombi<Props & Z1 & Z2 & Z3>;
  public compose<Z1, Z2, Z3, Z4>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>]): Zombi<Props & Z1 & Z2 & Z3 & Z4>;
  public compose<Z1, Z2, Z3, Z4, Z5>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z5>, Zombi<Z5>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8>;
  public compose<Z1, Z2, Z3, Z4, Z5, Z6, Z7, Z8, Z9>(condition: Resolveable<boolean, Props>, zombis: [Zombi<Z1>, Zombi<Z2>, Zombi<Z3>, Zombi<Z4>, Zombi<Z5>, Zombi<Z6>, Zombi<Z7>, Zombi<Z8>, Zombi<Z9>]): Zombi<Props & Z1 & Z2 & Z3 & Z4 & Z5 & Z6 & Z7 & Z8 & Z9>;
  /* eslint-enable prettier/prettier */

  /**
   * Create a new Zombi generator that composes other generators.
   *
   * @param condition - A resolveable condition that
   * determines whether the composition should take effect.
   * @param zombis - The other generators to compose.
   */
  public compose(
    conditionOrZombis: Resolveable<boolean, Props> | (Zombi<any> | Zombi<any>[]),
    moreZombis?: Zombi<any> | Zombi<any>[],
  ): Zombi<any> {
    const condition = isBoolean(conditionOrZombis) || isFunction(conditionOrZombis) ? conditionOrZombis : undefined;
    const zombis =
      isBoolean(conditionOrZombis) || isFunction(conditionOrZombis)
        ? ensureArray(moreZombis)
        : ensureArray(conditionOrZombis);

    let result: ZombiStreamOutput<any>;

    const target = merge({}, this.zombi$);
    target.subscribe(g => {
      result = g;
    });

    /**
     * Applies a condition to the underlying operators being composed. This
     * enables advanced use-cases where composition is optional depending on
     * user prompts.
     */
    const applyCondition = (se: SideEffect<any>): SideEffect<any> => {
      const effectCondition = se.condition;

      return merge(se, {
        condition: async generator => {
          if (Array.isArray(se)) return se.map(applyCondition);

          // First, we respect the given compose condition...
          if (condition) {
            const composeCondition = await resolveDataBuilder(generator)(condition);
            if (isBoolean(composeCondition) && !composeCondition) return false;
          }

          // If the compose condition is truthy, we move on to check the
          // underlying effect condition...
          return resolveDataBuilder(generator)(effectCondition);
        },
      } as SideEffectContext<any>);
    };

    /**
     * Apply the composed operators from the given source.
     */
    const doCompose = (z: Zombi<any>) => {
      const source = merge({}, z.zombi$);
      source.subscribe((g: ZombiStreamOutput<any>) => {
        result.prompts.push(...g.prompts.map(applyCondition));
        result.sequence.push(...g.sequence.map(applyCondition));
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
   * Resolves a path to the Zombi instance's `templateRoot`.
   *
   * @param {...string[]} pathSegments - Strings from which to resolve a path.
   */
  public resolveTemplate(...pathSegments: string[]) {
    if (this.templateRoot) {
      return resolve(this.templateRoot, ...pathSegments);
    }
  }

  /**
   * Resolves a path to the Zombi instance's `destinationRoot`.
   *
   * @param {...string[]} pathSegments - Strings from which to resolve a path.
   */
  public resolveDestination(...pathSegments: string[]) {
    return resolve(this.destinationRoot, ...pathSegments);
  }
}
