import { isArray } from 'lodash';
import type { Definitely, Maybe } from '../types';

function isArrayType<T>(value: T | T[]): value is T[] {
  return isArray(value);
}

export function ensureArray<T>(value: T | T[]): T[] {
  return isArrayType(value) ? value : [value];
}

export function cleanArray<T extends Maybe<any>>(value: T[]): Definitely<T>[] {
  return value.filter(Boolean) as Definitely<T>[];
}
