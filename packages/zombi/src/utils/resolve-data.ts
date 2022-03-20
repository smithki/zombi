import { isFunction } from 'lodash';
import { Resolveable, Maybe } from '../types';

type ValueFromResolveable<T extends Resolveable<any, any>> = T extends Resolveable<infer R, any> ? R : never;
type DataFromResolveable<T extends Resolveable<any, any>> = T extends Resolveable<any, infer R> ? R : never;

export function resolveData<T extends Resolveable<any, any>>(
  source: T,
  data?: Maybe<DataFromResolveable<T>>,
): ValueFromResolveable<T> {
  return isFunction(source) ? source(data || {}) : source;
}
