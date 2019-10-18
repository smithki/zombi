// --- Imports -------------------------------------------------------------- //

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Types
import { SideEffect, ZombiParallelismOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

let savedSet: (SideEffect<any> | SideEffect<any>[])[] | undefined = undefined;

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * Start piping a set of parallel tasks into the generator.
 */
export function startParallelism<T>(): ZombiParallelismOperator<T> {
  return map(generator => {
    const result = merge({}, generator);
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
  return map(generator => {
    const result = merge({}, generator);
    const parallelSet = [...result.sequence];
    // Restore original sequence and append the current sequence as a list of
    // parallel tasks.
    result.sequence = [...(savedSet as any), parallelSet];
    savedSet = undefined;
    return result;
  }) as ZombiParallelismOperator<T>;
}
