import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { Resolveable, Question, PromptOperator } from '../types/core';
import { RequiredOnly, Maybe } from '../types/utility';
import { cleanArray, ensureArray } from '../utils/array-helpers';
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
export function prompt<T>(
  questions: Resolveable<Maybe<Question<T>>, T> | Resolveable<Maybe<Question<T>>[], T>,
): PromptOperator<T> {
  return (stream => {
    return stream.pipe(
      map(ctx => {
        const result = merge({}, ctx);

        result.prompts.push(async (output, { ask }) => {
          const q = cleanArray(ensureArray(await resolveDataBuilder(output)(questions)));
          const answers = await ask(q);
          merge(output.props, answers);
        });

        return result;
      }),
    );
  }) as PromptOperator<T>;
}
