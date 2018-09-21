// --- Imports -------------------------------------------------------------- //

// Local modules
import { task } from './task';

// Types
import { Data, JsonData, Operator } from '../types';
import { extractData } from '../utils/extract-data';

// --- Logic ---------------------------------------------------------------- //

/**
 * Extend a JSON file.
 *
 * @param file The target file path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param extensions JSON data with which to extend the existing file.
 */
export const extendJson = <T>(
  file: Data<string, T>,
  extensions?: Data<JsonData, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = await extractData(generator);
      const filePath = await extract(file);
      const data = await extract(extensions);

      await generator.fs.extendJson(filePath, data);
    } catch (err) {
      throw err;
    }
  });
