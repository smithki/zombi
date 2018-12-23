// --- Imports -------------------------------------------------------------- //

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Types
import { Operator, SideEffect } from '../types';

// --- Business logic ------------------------------------------------------- //

let savedSet: (SideEffect<any> | SideEffect<any>[])[] = undefined;

/**
 * Start piping a set of parallel tasks into the generator.
 */
export function startParallelism<T>(): Operator<T> {
  return map(g => {
    const result = merge({}, g);
    // Copy the current sequence by value.
    savedSet = [...result.sequence];
    result.sequence = [];
    return result;
  });
}

/**
 * Finish piping a set of parallel tasks into the generator.
 */
export function endParallelism<T>(): Operator<T> {
  return map(g => {
    const result = merge({}, g);
    const parallelSet = [...result.sequence];
    // Restore original sequence and append the current sequence as a list of
    // parallel tasks.
    result.sequence = [...(savedSet as any), parallelSet];
    savedSet = undefined;
    return result;
  });
}
