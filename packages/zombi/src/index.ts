import { Zombi } from './generator';
import { Configuration } from './types';

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
export { ZombiErrorCode } from './exceptions';
