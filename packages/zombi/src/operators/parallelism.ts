import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { SideEffect, ParallelismOperator } from '../types/core';

let savedSet: (SideEffect<any> | SideEffect<any>[])[] | undefined;

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * Start piping a set of parallel tasks into the generator.
 * @internal
 */
export function startParallelism<T>(): ParallelismOperator<T> {
  return map(output => {
    const result = merge({}, output);
    // Copy the current sequence by value.
    savedSet = [...result.sequence];
    result.sequence = [];
    return result;
  }) as ParallelismOperator<T>;
}

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * Finish piping a set of parallel tasks into the generator.
 * @internal
 */
export function endParallelism<T>(): ParallelismOperator<T> {
  return map(output => {
    const result = merge({}, output);
    const parallelSet = [...result.sequence];
    // Restore original sequence and append the current sequence as a list of
    // parallel tasks.
    result.sequence = [...(savedSet as any), parallelSet];
    savedSet = undefined;
    return result;
  }) as ParallelismOperator<T>;
}
