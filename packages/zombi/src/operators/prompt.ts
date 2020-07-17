import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { GeneratorData, Question, RequiredOnly, ZombiPromptOperator } from '../types';
import { ensureArray } from '../utils/ensure-array';
import { resolveDataBuilder } from '../utils/resolve-data';

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
  questions: GeneratorData<Question<RequiredOnly<K>> | Question<RequiredOnly<K>>[], T>,
): ZombiPromptOperator<T> {
  return (stream => {
    return stream.pipe(
      map(generator => {
        const result = merge({}, generator);

        result.prompts.push(async (g, { ask }) => {
          const q = ensureArray(await resolveDataBuilder(g)(questions));
          const answers = await ask(q);
          merge(g.props, answers);
        });

        return result;
      }),
    );
  }) as ZombiPromptOperator<T>;
}
