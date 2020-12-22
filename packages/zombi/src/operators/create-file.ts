import { Resolveable } from '../types/core';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

interface CreateFileOptions {
  /**
   * The destination path. A relative path will be automatically
   * resolved to the executing generator's `destinationRoot`.
   */
  file: string;

  /**
   * Data with which to fill the new file.
   */
  data?: any;

  /**
   * Options for customizing file system and side-effect behavior.
   */
  fsOptions?: Pick<FSOptions, 'ejs' | 'clobber'>;
}

/**
 * Create a new file.
 */
export function createFile<T>(options: Resolveable<CreateFileOptions, T>) {
  return sideEffect<T>(async (output, { fs }) => {
    const resolveData = resolveDataBuilder(output);
    const { file, data, fsOptions } = await resolveData(options);
    await fs.createFile(file, data, fsOptions);
  });
}
