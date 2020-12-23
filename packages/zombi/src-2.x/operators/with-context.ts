import { SideEffectContext, SideEffectOperator } from '../types/core';
import { applyOperatorContext } from '../utils/apply-operator-context';
import { ensureArray } from '../utils/array-helpers';

/**
 * Apply arbitrary context to side-effecting operators.
 *
 * @param operators - Operators to apply the given `context`.
 * @param context - Context to decorate the `operators` with.
 */
export function withContext<T>(
  operators: SideEffectOperator<T> | SideEffectOperator<T>[],
  context: SideEffectContext<T> = {},
): SideEffectOperator<T> {
  return ((stream, currentContext) => {
    const operatorsWithContext = ensureArray(operators).map(op =>
      applyOperatorContext(op, { ...currentContext, ...context }),
    );

    return (stream.pipe as any)(...operatorsWithContext);
  }) as SideEffectOperator<T>;
}
