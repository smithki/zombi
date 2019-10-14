// --- Imports -------------------------------------------------------------- //

import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { GeneratorData, GeneratorOutput } from '../types';

// --- Business logic ------------------------------------------------------- //

export function resolveEjsDataBuilder(generator: GeneratorOutput<any>) {
  return async (data: GeneratorData<EjsData, any>) => {
    try {
      return merge(
        {},
        generator.props,
        (await resolveDataBuilder(generator)(data)) || {},
      );
    } catch (err) {
      throw err;
    }
  };
}

export function resolveDataBuilder(generator: GeneratorOutput<any>) {
  return async <T>(value: T | ((...args: any[]) => Promise<T>)) => {
    return typeof value === 'function'
      ? await (value as any)(generator)
      : value;
  };
}
