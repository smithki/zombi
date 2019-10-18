// --- Imports -------------------------------------------------------------- //

import { Generator } from './generator';
import { GeneratorConfig } from './types';

// --- Generator factory ---------------------------------------------------- //

/**
 * Create a new `zombi` generator.
 *
 * @param options - Options for this generator.
 */
export function zombi<Props>(options: GeneratorConfig<Props> = {}) {
  return new Generator<Props>(options);
}

export * from './types/core';
export { ZombiErrorCode } from './exceptions';
