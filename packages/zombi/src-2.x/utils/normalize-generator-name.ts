import { kebabCase } from 'lodash';

let num = 0;

export function normalizeGeneratorName(str?: string) {
  if (str) return kebabCase(str);
  return `zombi-${++num}`;
}
