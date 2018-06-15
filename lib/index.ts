// Imports ---------------------------------------------------------------------

import { Generator } from './core';
import { Options } from './types';

// Logic -----------------------------------------------------------------------

/**
 * Creates a new generator.
 *
 * @param options Options for this generator.
 */
export const zombi = <Props>(options: Options<Props> = {}) =>
  new Generator<Props>(options);

export * from './operators';
