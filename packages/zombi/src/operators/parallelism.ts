import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { SideEffect, ZombiParallelismOperator } from '../types';

let savedSet: (SideEffect<any> | SideEffect<any>[])[] | undefined;

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * Start piping a set of parallel tasks into the generator.
 */
export function startParallelism<T>(): ZombiParallelismOperator<T> {
  return map(output => {
    const result = merge({}, output);
    // Copy the current sequence by value.
    savedSet = [...result.sequence];
    result.sequence = [];
    return result;
  }) as ZombiParallelismOperator<T>;
}

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * Finish piping a set of parallel tasks into the generator.
 */
export function endParallelism<T>(): ZombiParallelismOperator<T> {
  return map(output => {
    const result = merge({}, output);
    const parallelSet = [...result.sequence];
    // Restore original sequence and append the current sequence as a list of
    // parallel tasks.
    result.sequence = [...(savedSet as any), parallelSet];
    savedSet = undefined;
    return result;
  }) as ZombiParallelismOperator<T>;
}
