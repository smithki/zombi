// Imports ---------------------------------------------------------------------

import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { Data, GeneratorOutput } from '../types';

// Logic -----------------------------------------------------------------------

export const extractEjsData = (generator: GeneratorOutput<any>) => async (
  data: Data<EjsData, any>,
) => {
  try {
    return merge(
      {},
      generator.props,
      (await extractData(generator)(data)) || {},
    );
  } catch (err) {
    throw err;
  }
};

export const extractData = (generator: GeneratorOutput<any>) => async <T>(
  value: T | ((...args) => Promise<T>),
) => {
  return typeof value === 'function' ? await value(generator) : value;
};
