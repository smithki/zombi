import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { Resolveable, Question, RequiredOnly, ZombiPromptOperator } from '../types';
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
  questions: Resolveable<Question<RequiredOnly<K>> | Question<RequiredOnly<K>>[], T>,
): ZombiPromptOperator<T> {
  return (stream => {
    return stream.pipe(
      map(ctx => {
        const result = merge({}, ctx);

        result.prompts.push(async (output, { ask }) => {
          const q = ensureArray(await resolveDataBuilder(output)(questions));
          const answers = await ask(q);
          merge(output.props, answers);
        });

        return result;
      }),
    );
  }) as ZombiPromptOperator<T>;
}
