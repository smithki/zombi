import { execSync } from 'child_process';
import { parse } from 'ini';

/**
 * Retrieve a specific config value from `.npmrc` or an object containing all
 * config values. Uses `npm config get [key]` internally. Does not throw,
 * instead returns `undefined` if a key cannot be resolved.
 *
 * @param key The config key you are targeting. See [NPM
 * docs](https://docs.npmjs.com/misc/config) for available keys. If left
 * `undefined`, all config values will be returned in a plain object.
 */
export function getNpmConfig<T = any>(key?: string): T {
  if (key) {
    const result = execSync(`npm config get ${key}`, {
      stdio: ['ignore', 'pipe', 'pipe'], // Prevent writing output to the console
    })
      .toString()
      .replace(/\n$/, ''); // Remove any newline characters

    if (result && !key) {
      return parse(result) as T;
    }

    // If our search results in e
    return (!result ? undefined : result) as any;
  }

  return undefined as any;
}
