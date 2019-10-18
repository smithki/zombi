// --- Imports -------------------------------------------------------------- //

// Node modules
import { merge } from 'lodash';
import { map } from 'rxjs/operators';

// Local modules
import { ensureArray } from '../utils/ensure-array';
import { prompt as ask } from '../utils/inquirer';
import { resolveDataBuilder } from '../utils/resolve-data';

// Types
import {
  GeneratorData,
  Question,
  RequiredOnly,
  ZombiPromptOperator,
} from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * A wrapper for [Inquirer's prompt API](https://github.com/SBoudrias/Inquirer.js/#methods).
 * Prompts for user input and saves the resulting data into props.
 *
 * @param questions - Array of Inquirer-compatible
 * [question](https://github.com/SBoudrias/Inquirer.js/#question) objects.
 */
export function prompt<T, K extends T = T>(
  questions: GeneratorData<
    Question<RequiredOnly<K>> | Question<RequiredOnly<K>>[],
    T
  >,
): ZombiPromptOperator<T> {
  return (stream => {
    return stream.pipe(
      map(generator => {
        const result = merge({}, generator);

        result.prompts.push(async cache => {
          const q = ensureArray(await resolveDataBuilder(cache)(questions));
          const answers = await ask(q);
          merge(cache.props, answers);
        });

        return result;
      }),
    );
  }) as ZombiPromptOperator<T>;
}
