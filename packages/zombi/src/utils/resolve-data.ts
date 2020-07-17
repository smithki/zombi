import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { GeneratorData, GeneratorOutput } from '../types';

export function resolveEjsDataBuilder(generator: GeneratorOutput<any>) {
  return async (data: GeneratorData<EjsData, any>) => {
    return merge({}, generator.props, (await resolveDataBuilder(generator)(data)) || {});
  };
}

export function resolveDataBuilder(generator: GeneratorOutput<any>) {
  return async <T>(value: T | ((...args: any[]) => Promise<T>)) => {
    return typeof value === 'function' ? (value as any)(generator) : value;
  };
}
