import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { Resolveable, ZombiStreamOutput } from '../types';

export function resolveEjsDataBuilder(output: ZombiStreamOutput<any>) {
  return async (data: Resolveable<EjsData, any>): Promise<EjsData> => {
    return merge({}, output.props, (await resolveDataBuilder(output)(data)) || {});
  };
}

export function resolveDataBuilder(output: ZombiStreamOutput<any>) {
  return async <T>(value: T | ((...args: any[]) => T | Promise<T>)): Promise<T> => {
    return typeof value === 'function' ? (value as any)(output) : value;
  };
}
