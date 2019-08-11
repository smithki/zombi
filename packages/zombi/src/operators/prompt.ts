// --- Imports -------------------------------------------------------------- //

// Node modules
import { prompt as ask } from 'inquirer';
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Local modules
import { ensureArray } from '../utils/ensure-array';
import { resolveDataBuilder } from '../utils/resolve-data';

// Types
import { GeneratorData, Question, ZombiOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * A wrapper for [Inquirer's prompt
 * API](https://github.com/SBoudrias/Inquirer.js/#methods). Prompts for user
 * input and saves the resulting data into props.
 *
 * @param questions Array of Inquirer-compatible
 * [question](https://github.com/SBoudrias/Inquirer.js/#question) objects.
 */
export function prompt<T, K extends T = T>(
  questions: GeneratorData<Question<K> | Question<K>[], T>,
): ZombiOperator<T> {
  return map(g => {
    const result = merge({}, g);

    result.prompts.push(async cache => {
      const q = ensureArray(await resolveDataBuilder(cache)(questions));
      const answers = await ask(q);
      merge(cache.props, answers);
    });

    return result;
  });
}
