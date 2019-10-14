// --- Imports -------------------------------------------------------------- //

// Local modules
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

// Types
import {
  FSOptions,
  GeneratorData,
  JsonData,
  ZombiSideEffectOperator,
} from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Create a JSON-formatted file.
 *
 * @param file - The destination path. A relative path will be automatically
 * resolved to the executing generator's `destinationRoot`.
 * @param data - JSON data with which to fill the new file.
 * @param options - Options for customizing file system and side-effect behavior.
 */
export function createJson<T>(
  file: GeneratorData<string, T>,
  data?: GeneratorData<JsonData, T>,
  options?: GeneratorData<Pick<FSOptions, 'ejs' | 'force'>, T>,
): ZombiSideEffectOperator<T> {
  return sideEffect(async generator => {
    try {
      const resolveData = resolveDataBuilder(generator);
      const filePath = await resolveData(file);
      const json = await resolveData(data!);
      const opts = await resolveData(options!);

      await generator.fs.createJson(filePath, json, opts);
    } catch (err) {
      throw err;
    }
  });
}
