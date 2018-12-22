// --- Imports -------------------------------------------------------------- //

// Local modules
import { resolveData } from '../utils/resolve-data';
import { task } from './task';

// Types
import { FSOptions, GeneratorData, Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Create a new file.
 *
 * @param file The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param content Data with which to fill the new file.
 */
export const createFile = <T>(
  file: GeneratorData<string, T>,
  content?: GeneratorData<any, T>,
  options?: GeneratorData<FSOptions, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = resolveData(generator);
      const filePath = await extract(file);
      const data = await extract(content);
      const opts = await extract(options);

      await generator.fs.createFile(filePath, data, opts);
    } catch (err) {
      throw err;
    }
  });
