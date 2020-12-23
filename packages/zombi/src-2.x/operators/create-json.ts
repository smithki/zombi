import { Resolveable, JsonData } from '../types/core';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

interface CreateJsonOptions {
  /**
   *  The destination path. A relative path will be automatically
   * resolved to the executing generator's `destinationRoot`.
   */
  file: string;

  /**
   * JSON data with which to fill the new file.
   */
  data?: JsonData;

  /**
   * Options for customizing file system and side-effect behavior.
   */
  fsOptions?: Pick<FSOptions, 'ejs' | 'clobber'>;
}

/**
 * Create a JSON-formatted file.
 */
export function createJson<T>(options: Resolveable<CreateJsonOptions, T>) {
  return sideEffect<T>(async (output, { fs }) => {
    const resolveData = resolveDataBuilder(output);
    const { file, data, fsOptions } = await resolveData(options);
    await fs.createJson(file, data, fsOptions);
  });
}
