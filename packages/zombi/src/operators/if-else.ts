import { GeneratorData, ZombiSideEffectOperator } from '../types';
import { applyOperatorContext } from '../utils/apply-operator-context';
import { ensureArray } from '../utils/ensure-array';
import { resolveDataBuilder } from '../utils/resolve-data';

/**
 * Selectively apply side-effecting operators based on a condition.
 *
 * @param condition - A `boolean` or predicate callback resolving to `boolean`.
 * @param truthyOperators - Operators to apply if the condition is `true`.
 * @param falseyOperators - Operators to apply if the condition is `false`.
 */
export function ifElse<T>(
  condition: GeneratorData<boolean, T>,
  truthyOperators: ZombiSideEffectOperator<T>[],
  falseyOperators: ZombiSideEffectOperator<T>[] = [],
): ZombiSideEffectOperator<T> {
  return (stream => {
    const truthyOperatorsArray = ensureArray(truthyOperators).map(op => applyOperatorContext(op, { condition }));

    const reversedCondition: GeneratorData<boolean, T> = async generator => {
      const originalCondition = await resolveDataBuilder(generator)(condition);
      return !originalCondition;
    };

    const falseyOperatorsArray = ensureArray(falseyOperators).map(op =>
      applyOperatorContext(op, { condition: reversedCondition }),
    );

    return (stream.pipe as any)(...truthyOperatorsArray, ...falseyOperatorsArray);
  }) as ZombiSideEffectOperator<T>;
}
