// --- Imports -------------------------------------------------------------- //

// Local modules
import { sideEffect } from './side-effect';

// Types
import { GeneratorData, JsonData, Operator } from '../types';
import { resolveDataBuilder } from '../utils/resolve-data';

// --- Business logic ------------------------------------------------------- //

/**
 * Extend a JSON file.
 *
 * @param file The target file path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param extensions JSON data with which to extend the existing file.
 */
export function extendJson<T>(
  file: GeneratorData<string, T>,
  extensions?: GeneratorData<JsonData, T>,
): Operator<T> {
  return sideEffect(async generator => {
    try {
      const resolveData = await resolveDataBuilder(generator);
      const filePath = await resolveData(file);
      const data = await resolveData(extensions!);

      await generator.fs.extendJson(filePath, data);
    } catch (err) {
      throw err;
    }
  });
}
