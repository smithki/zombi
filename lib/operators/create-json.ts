// -----------------------------------------------------------------------------
// Imports

// Node modules
import { Data as EjsData } from 'ejs';
import { isAbsolute } from 'path';

// Local modules
import { extractData } from '../util/extract-data';
import { createJson as _createJson, FSOptions } from '../util/fs';
import { task } from './task';

// Types
import { Data, JsonData, Operator } from '../types';

// -----------------------------------------------------------------------------
// Logic

/**
 * Create a JSON-formatted file.
 *
 * @param file The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param data JSON data with which to fill the new file.
 */
export const createJson = <T>(
  file: Data<string, T>,
  data?: Data<JsonData, T>,
  options?: Data<FSOptions, T>,
): Operator<T> =>
  task(async generator => {
    try {
      const extract = extractData(generator);
      const filePath = await extract(file);
      const json = await extract(data);
      const opts = await extract(options);

      await _createJson(generator)(filePath, json, opts);
    } catch (err) {
      throw err;
    }
  });
