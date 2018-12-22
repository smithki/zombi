// --- Imports -------------------------------------------------------------- //

// Local modules
import { resolveData } from '../utils/resolve-data';
import { task } from './task';

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
export const createJson = <T>(
  file: GeneratorData<string, T>,
  data?: GeneratorData<JsonData, T>,
  options?: GeneratorData<FSOptions, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = resolveData(generator);
      const filePath = await extract(file);
      const json = await extract(data);
      const opts = await extract(options);

      await generator.fs.createJson(filePath, json, opts);
    } catch (err) {
      throw err;
    }
  });
