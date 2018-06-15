// IMPORTS ---------------------------------------------------------------------

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Types
import { Callback, Operator, TaskOptions } from '../types';

// LOGIC -----------------------------------------------------------------------

/**
 * Add generator tasks to perform side-effects during the run process. Similar
 * to RxJS
 * [do](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do)
 * or [tap](http://reactivex.io/rxjs/function/index.html#static-function-tap).
 *
 * @param task A callback to be executed during the run process.
 * @param options Customize the flow of tasks by providing an options object
 * with `enforcePre` set to true.
 */
export const task = <T>(
  task: Callback<T>,
  options: TaskOptions = {},
): Operator<T> =>
  map(g => {
    const result = merge({}, g);

    if (options.enforcePre) result.sequence.unshift(task);
    else result.sequence.push(merge(task, options));

    return result;
  });
