import { Questions } from '../types';

/**
 * Merges multiple `Questions` into one, flattened array.
 */

/* eslint-disable prettier/prettier */
export function mergePrompts<A>(...questions: [Questions<A>]): Questions<A>;
export function mergePrompts<A, B>(...questions: [Questions<A>, Questions<B>]): Questions<A & B>;
export function mergePrompts<A, B, C>(...questions: [Questions<A>, Questions<B>, Questions<C>]): Questions<A & B & C>;
export function mergePrompts<A, B, C, D>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>]): Questions<A & B & C & D>;
export function mergePrompts<A, B, C, D, E>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>]): Questions<A & B & C & D & E>;
export function mergePrompts<A, B, C, D, E, F>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>]): Questions<A & B & C & D & E & F>;
export function mergePrompts<A, B, C, D, E, F, G>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>]): Questions<A & B & C & D & E & F & G>;
export function mergePrompts<A, B, C, D, E, F, G, H>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>]): Questions<A & B & C & D & E & F & G & H>;
export function mergePrompts<A, B, C, D, E, F, G, H, I>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>]): Questions<A & B & C & D & E & F & G & H & I>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>]): Questions<A & B & C & D & E & F & G & H & I & J>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>]): Questions<A & B & C & D & E & F & G & H & I & J & K>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>, Questions<V>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>, Questions<V>, Questions<W>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>, Questions<V>, Questions<W>, Questions<X>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>, Questions<V>, Questions<W>, Questions<X>, Questions<Y>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y>;
export function mergePrompts<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(...questions: [Questions<A>, Questions<B>, Questions<C>, Questions<D>, Questions<E>, Questions<F>, Questions<G>, Questions<H>, Questions<I>, Questions<J>, Questions<K>, Questions<L>, Questions<M>, Questions<N>, Questions<O>, Questions<P>, Questions<Q>, Questions<R>, Questions<S>, Questions<T>, Questions<U>, Questions<V>, Questions<W>, Questions<X>, Questions<Y>, Questions<Z>]): Questions<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y & Z>;
/* eslint-enable prettier/prettier */

export function mergePrompts(...questions: Questions<any>[]): Questions<any> {
  const result: Questions<any> = [];

  questions.forEach((q) => {
    if (Array.isArray(q)) {
      result.push(...q);
    } else {
      result.push(q);
    }
  });

  return result;
}
