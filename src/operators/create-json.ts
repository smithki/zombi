// --- Imports -------------------------------------------------------------- //

// Local modules
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './task';

// Types
import { FSOptions, GeneratorData, JsonData, Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Create a JSON-formatted file.
 *
 * @param file The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param data JSON data with which to fill the new file.
 */
export function createJson<T>(
  file: GeneratorData<string, T>,
  data?: GeneratorData<JsonData, T>,
  options?: GeneratorData<FSOptions, T>,
): Operator<T> {
  return sideEffect(async generator => {
    try {
      const resolveData = resolveDataBuilder(generator);
      const filePath = await resolveData(file);
      const json = await resolveData(data);
      const opts = await resolveData(options);

      await generator.fs.createJson(filePath, json, opts);
    } catch (err) {
      throw err;
    }
  });
}
