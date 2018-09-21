// --- Imports -------------------------------------------------------------- //

// Local modules
import { extractData } from '../utils/extract-data';
import { task } from './task';

// Types
import { Data, FSOptions, Operator } from '../types';

// --- Logic ---------------------------------------------------------------- //

/**
 * Create a new file.
 *
 * @param file The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param content Data with which to fill the new file.
 */
export const createFile = <T>(
  file: Data<string, T>,
  content?: Data<any, T>,
  options?: Data<FSOptions, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = extractData(generator);
      const filePath = await extract(file);
      const data = await extract(content);
      const opts = await extract(options);

      await generator.fs.createFile(filePath, data, opts);
    } catch (err) {
      throw err;
    }
  });
