// --- Imports -------------------------------------------------------------- //

// Local modules
import { task } from './task';

// Types
import { GeneratorData, JsonData, Operator } from '../types';
import { resolveData } from '../utils/resolve-data';

// --- Business logic ------------------------------------------------------- //

/**
 * Extend a JSON file.
 *
 * @param file The target file path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param extensions JSON data with which to extend the existing file.
 */
export const extendJson = <T>(
  file: GeneratorData<string, T>,
  extensions?: GeneratorData<JsonData, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = await resolveData(generator);
      const filePath = await extract(file);
      const data = await extract(extensions);

      await generator.fs.extendJson(filePath, data);
    } catch (err) {
      throw err;
    }
  });
