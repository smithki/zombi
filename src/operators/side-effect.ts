// --- Imports -------------------------------------------------------------- //

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Types
import {
  Generator,
  isParallel,
  parallelismId,
  parallelOperatorCache,
} from '../generator';
import { Callback, Operator, SideEffectOperatorOptions } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Perform side-effects during the run process. Similar to RxJS
 * [`do`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do)
 * or [`tap`](http://reactivex.io/rxjs/function/index.html#static-function-tap).
 *
 * @param callback A function to be executed during the run process.
 * @param options Customize the flow of tasks by providing an options object
 * with `enforcePre` set to true.
 */
export function sideEffect<T>(
  callback: Callback<T>,
  options: SideEffectOperatorOptions = {},
): Operator<T> {
  return map(g => {
    const result = merge({}, g);

    if (options.enforcePre) result.sequence.unshift(callback);
    else result.sequence.push(merge(callback, options));

    return result;
  });
}
