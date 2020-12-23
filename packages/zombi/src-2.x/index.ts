import { Zombi } from './generator';
import { Configuration } from './types/core';

/**
 * Create a new `zombi` generator.
 *
 * @param options - Options for this generator.
 */
export function zombi<Props>(options: Configuration<Props> = {}) {
  return new Zombi<Props>(options);
}

export * from './types/core';
export * from './operators';
export * from './exceptions';
