// --- Imports -------------------------------------------------------------- //

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Local modules
import { copyObject } from '../utils/copy-object';

// Types
import {
  Callback,
  SideEffect,
  SideEffectOperatorOptions,
  ZombiSideEffectOperator,
} from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Perform side-effects during the run process. Similar to RxJS
 * [`do`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do)
 * or [`tap`](http://reactivex.io/rxjs/function/index.html#static-function-tap).
 *
 * @param callback - A function to be executed during the run process.
 * @param options - Customize the flow of tasks by providing an options object
 * with `enforcePre` set to true.
 */
export function sideEffect<T>(
  callback: Callback<T>,
  options: SideEffectOperatorOptions<T> = {},
): ZombiSideEffectOperator<T> {
  return map(generator => {
    const result = copyObject(generator);

    const defaultOptions: SideEffectOperatorOptions<T> = {
      enforcePre: false,
      condition: true,
    };

    const sideEffectCallback: SideEffect<T> = merge(
      callback,
      defaultOptions,
      options,
    );

    if (options.enforcePre) result.sequence.unshift(sideEffectCallback);
    else result.sequence.push(sideEffectCallback);

    return result;
  }) as ZombiSideEffectOperator<T>;
}
