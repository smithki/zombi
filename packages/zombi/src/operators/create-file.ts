import { FSOptions, GeneratorData, ZombiSideEffectOperator } from '../types';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

/**
 * Create a new file.
 *
 * @param file - The destination path. A relative path will be automatically
 * resolved to the executing generator's `destinationRoot`.
 * @param content - Data with which to fill the new file.
 * @param options - Options for customizing file system and side-effect behavior.
 */
export function createFile<T>(
  file: GeneratorData<string, T>,
  content?: GeneratorData<any, T>,
  options?: GeneratorData<Pick<FSOptions, 'ejs' | 'force'>, T>,
): ZombiSideEffectOperator<T> {
  return sideEffect(async (generator, { fs }) => {
    const resolveData = resolveDataBuilder(generator);
    const filePath = await resolveData(file);
    const data = await resolveData(content);
    const opts = await resolveData(options);

    await fs.createFile(filePath, data, opts);
  });
}
