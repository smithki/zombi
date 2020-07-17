import { isArray } from 'lodash';

function isArrayType<T>(value: T | T[]): value is T[] {
  return isArray(value);
}

export function ensureArray<T>(value: T | T[]): T[] {
  return isArrayType(value) ? value : [value];
}
