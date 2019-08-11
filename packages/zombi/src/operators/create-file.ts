// --- Imports -------------------------------------------------------------- //

// Local modules
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

// Types
import { FSOptions, GeneratorData, ZombiOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Create a new file.
 *
 * @param file The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param content Data with which to fill the new file.
 */
export function createFile<T>(
  file: GeneratorData<string, T>,
  content?: GeneratorData<any, T>,
  options?: GeneratorData<FSOptions, T>,
): ZombiOperator<T> {
  return sideEffect(async generator => {
    try {
      const resolveData = resolveDataBuilder(generator);
      const filePath = await resolveData(file);
      const data = await resolveData(content);
      const opts = await resolveData(options!);

      await generator.fs.createFile(filePath, data, opts);
    } catch (err) {
      throw err;
    }
  });
}
