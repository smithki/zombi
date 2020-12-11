import { Resolveable, JsonData, SideEffectOperator } from '../types/core';
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
): SideEffectOperator<T> {
  return sideEffect(async (output, { fs }) => {
    const resolveData = resolveDataBuilder(output);
    const filePath = await resolveData(file);
    const data = await resolveData(extensions);

    await fs.extendJson(filePath, data);
  });
}
