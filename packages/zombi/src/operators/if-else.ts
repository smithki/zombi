import { Resolveable, SideEffectOperator } from '../types/core';
import { applyOperatorContext } from '../utils/apply-operator-context';
import { ensureArray } from '../utils/array-helpers';
import { resolveDataBuilder } from '../utils/resolve-data';

/**
 * Selectively apply side-effecting operators based on a condition.
 *
 * @param condition - A `boolean` or predicate callback resolving to `boolean`.
 * @param truthyOperators - Operators to apply if the condition is `true`.
 * @param falseyOperators - Operators to apply if the condition is `false`.
 */
export function ifElse<T>(
  condition: Resolveable<boolean, T>,
  truthyOperators: SideEffectOperator<T>[],
  falseyOperators: SideEffectOperator<T>[] = [],
): SideEffectOperator<T> {
  return ((stream, context) => {
    const truthyOperatorsArray = ensureArray(truthyOperators).map(op =>
      applyOperatorContext(op, { ...context, condition }),
    );

    const reversedCondition: Resolveable<boolean, T> = async ctx => {
      const originalCondition = await resolveDataBuilder(ctx)(condition);
      return !originalCondition;
    };

    const falseyOperatorsArray = ensureArray(falseyOperators).map(op =>
      applyOperatorContext(op, { ...context, condition: reversedCondition }),
    );

    return (stream.pipe as any)(...truthyOperatorsArray, ...falseyOperatorsArray);
  }) as SideEffectOperator<T>;
}
