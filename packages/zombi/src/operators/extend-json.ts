import { Resolveable, JsonData, ZombiSideEffectOperator } from '../types';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

/**
 * Extend a JSON file.
 *
 * @param file - The target file path. A relative path will be automatically
 * resolved to the executing generator's `destinationRoot`.
 * @param extensions - JSON data with which to extend the existing file.
 */
export function extendJson<T>(
  file: Resolveable<string, T>,
  extensions?: Resolveable<JsonData, T>,
): ZombiSideEffectOperator<T> {
  return sideEffect(async (generator, { fs }) => {
    const resolveData = resolveDataBuilder(generator);
    const filePath = await resolveData(file);
    const data = await resolveData(extensions);

    await fs.extendJson(filePath, data);
  });
}
