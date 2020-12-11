import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { SideEffect, SideEffectContext, SideEffectOperator, SideEffectCallback } from '../types';

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
  callback: SideEffectCallback<T>,
  options: SideEffectContext<T> = {},
): SideEffectOperator<T> {
  return ((stream, context) => {
    return stream.pipe(
      map(output => {
        const result = merge({}, output);

        const defaultOptions: SideEffectContext<T> = {
          enforcePre: false,
          condition: true,
        };

        const sideEffectCallback: SideEffect<T> = merge(
          callback,
          defaultOptions,
          context,
          options, // Given options take precedence.
        );

        if (options.enforcePre) result.sequence.unshift(sideEffectCallback);
        else result.sequence.push(sideEffectCallback);

        return result;
      }),
    );
  }) as SideEffectOperator<T>;
}
