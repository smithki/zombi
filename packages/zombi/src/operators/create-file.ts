import { Resolveable, SideEffectOperator } from '../types';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

/**
 * Create a new file.
 *
 * @param file - The destination path. A relative path will be automatically
 * resolved to the executing generator's `destinationRoot`.
 * @param content - Data with which to fill the new file.
 * @param options - Options for customizing file system and side-effect behavior.
 */
export function createFile<T>(
  file: Resolveable<string, T>,
  content?: Resolveable<any, T>,
  options?: Resolveable<Pick<FSOptions, 'ejs' | 'clobber'>, T>,
): SideEffectOperator<T> {
  return sideEffect(async (output, { fs }) => {
    const resolveData = resolveDataBuilder(output);
    const filePath = await resolveData(file);
    const data = await resolveData(content);
    const opts = await resolveData(options);

    await fs.createFile(filePath, data, opts);
  });
}
