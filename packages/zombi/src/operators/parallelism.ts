// --- Imports -------------------------------------------------------------- //

// Node modules
import { map } from 'rxjs/operators';

// Types
import { SideEffect, ZombiOperator } from '../types';
import { copyObject } from '../utils/copy-object';

// --- Business logic ------------------------------------------------------- //

let savedSet: (SideEffect<any> | SideEffect<any>[])[] | undefined = undefined;

/**
 * Start piping a set of parallel tasks into the generator.
 */
export function startParallelism<T>(): ZombiOperator<T> {
  return map(g => {
    const result = copyObject(g);
    // Copy the current sequence by value.
    savedSet = [...result.sequence];
    result.sequence = [];
    return result;
  });
}

/**
 * Finish piping a set of parallel tasks into the generator.
 */
export function endParallelism<T>(): ZombiOperator<T> {
  return map(g => {
    const result = copyObject(g);
    const parallelSet = [...result.sequence];
    // Restore original sequence and append the current sequence as a list of
    // parallel tasks.
    result.sequence = [...(savedSet as any), parallelSet];
    savedSet = undefined;
    return result;
  });
}
