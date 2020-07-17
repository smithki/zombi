import { Resolveable, JsonData, ZombiSideEffectOperator } from '../types';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

/**
 * Create a JSON-formatted file.
 *
 * @param file - The destination path. A relative path will be automatically
 * resolved to the executing generator's `destinationRoot`.
 * @param data - JSON data with which to fill the new file.
 * @param options - Options for customizing file system and side-effect behavior.
 */
export function createJson<T>(
  file: Resolveable<string, T>,
  data?: Resolveable<JsonData, T>,
  options?: Resolveable<Pick<FSOptions, 'ejs' | 'clobber'>, T>,
): ZombiSideEffectOperator<T> {
  return sideEffect(async (generator, { fs }) => {
    const resolveData = resolveDataBuilder(generator);
    const filePath = await resolveData(file);
    const json = await resolveData(data);
    const opts = await resolveData(options);

    await fs.createJson(filePath, json, opts);
  });
}
