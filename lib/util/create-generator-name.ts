// Imports ---------------------------------------------------------------------

import { kebabCase } from 'lodash';

// Logic -----------------------------------------------------------------------

let num = 0;

export function createGeneratorName(str?: string) {
  if (str) return kebabCase(str);
  return `zombi-${++num}`;
}
