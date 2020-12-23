import { Resolveable, JsonData } from '../types/core';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

interface ExtendJsonOptions {
  /**
   * The target file path. A relative path will be automatically
   * resolved to the executing generator's `destinationRoot`.
   */
  file: string;

  /**
   * JSON data with which to extend the existing file.
   */
  data?: JsonData;
}

/**
 * Extend a JSON file.
 */
export function extendJson<T>(options: Resolveable<ExtendJsonOptions, T>) {
  return sideEffect<T>(async (output, { fs }) => {
    const resolveData = resolveDataBuilder(output);
    const { file, data } = await resolveData(options);
    await fs.extendJson(file, data);
  });
}
