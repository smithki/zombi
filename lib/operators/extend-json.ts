// Imports ---------------------------------------------------------------------

// Node modules
import { Data as EjsData } from 'ejs';
import { isAbsolute } from 'path';

// Local modules
import { extendJson as _extendJson } from '../util/fs';
import { task } from './task';

// Types
import { Data, JsonData, Operator } from '../types';
import { extractData } from '../util/extract-data';

// Logic -----------------------------------------------------------------------

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

      await _extendJson(generator)(filePath, data);
    } catch (err) {
      throw err;
    }
  });
