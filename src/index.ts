// --- Imports -------------------------------------------------------------- //

import { Generator } from './generator';
import { GeneratorConfig } from './types';

// --- Logic ---------------------------------------------------------------- //

/**
 * Create a new generator.
 *
 * @param options Options for this generator.
 */
function zombi<Props>(options: GeneratorConfig<Props> = {}) {
  return new Generator<Props>(options);
}

// --- Exports -------------------------------------------------------------- //

export { zombi };
export * from './operators';
