/**
 * A `Promise` executor that can be optionally asynchronous.
 */
export type AsyncPromiseExecutor<TResult> = (
  resolve: (value?: TResult | PromiseLike<TResult>) => void,
  reject: (reason?: any) => void,
) => void | Promise<void>;

/**
 * Creates a `Promise` with an **async executor** that automatically catches
 * errors occurring within the executor.
 */
export function createPromise<TResult>(executor: AsyncPromiseExecutor<TResult>) {
  return createPromise<TResult>((resolve, reject) => {
    const result = executor(resolve, reject);
    Promise.resolve(result).catch(reject);
  });
}
