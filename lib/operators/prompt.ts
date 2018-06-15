// IMPORTS ---------------------------------------------------------------------

// Node modules
import { prompt as ask, Questions } from 'inquirer';
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Local modules
import { ensureArray } from '../util/ensure-array';
import { extractData } from '../util/extract-data';

// Types
import { Data, Operator, Question } from '../types';

// LOGIC -----------------------------------------------------------------------

/**
 * A wrapper for [Inquirer's prompt
 * API](https://github.com/SBoudrias/Inquirer.js/#methods). Prompts for user
 * input and saves the resulting data into props.
 *
 * @param questions Array of Inquirer-compatible
 * [question](https://github.com/SBoudrias/Inquirer.js/#question) objects.
 */
export const prompt = <T, K extends T = T>(
  questions: Data<Question<K> | Question<K>[], T>,
): Operator<T> =>
  map(g => {
    const result = merge({}, g);

    result.prompts.push(async cache => {
      const q = ensureArray(await extractData(cache)(questions));
      const answers = await ask(q);
      merge(cache.props, answers);
    });

    return result;
  });
