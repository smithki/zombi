/* eslint-disable @typescript-eslint/ban-types */

import { Resolveable, SideEffectOperator, ZombiStream } from '../types';
import { applyOperatorContext } from '../utils/apply-operator-context';
import { resolveDataBuilder } from '../utils/resolve-data';

/**
 * Selectively apply side-effecting operators based on a condition with a
 * switch-like syntax.
 *
 * @param operatorKey - A string indicating the key to pick from `operatorMap`.
 * @param operatorMap - A mapping of operators to use based on the key resolved by `operatorKey`.
 */
export function mapEffects<T, O extends Record<string, SideEffectOperator<T>[]> = {}, K extends string = string>(
  operatorKey: Resolveable<K, T>,
  operatorMap: O,
): SideEffectOperator<T> {
  return (stream => {
    const getCondition = (key: string): Resolveable<boolean, T> => async ctx => {
      const keyResolved = await resolveDataBuilder(ctx)(operatorKey);
      return key === keyResolved;
    };

    let result: ZombiStream<T> = stream;

    for (const [key, operators] of Object.entries(operatorMap)) {
      const operatorsWithContext = operators.map(op => applyOperatorContext(op, { condition: getCondition(key) }));
      result = (result.pipe as any)(...operatorsWithContext);
    }

    return result;
  }) as SideEffectOperator<T>;
}
