import { Operator, ZombiStream } from '../types';

/**
 * Applies contextual values to an operator function.
 *
 * @param operator - The operator function to decorate with context data.
 * @param context - Arbitrary data to pass with the `GeneratorStream` to the
 * operator function.
 */
export function applyOperatorContext<T extends Operator<any>, C = any>(operator: T, context: C): T {
  return ((stream: ZombiStream<any>) => {
    return operator.apply(operator, [stream, context]);
  }) as T;
}
