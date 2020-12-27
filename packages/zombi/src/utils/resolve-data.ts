import { isFunction } from 'lodash';
import { Data as EjsData } from 'ejs';
import { Resolveable, Maybe } from '../types';

export function resolveData<T>(source: Resolveable<T>, data?: Maybe<EjsData>): T {
  return isFunction(source) ? source(data || {}) : source;
}
