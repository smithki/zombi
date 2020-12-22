import { merge } from 'lodash';
import { map } from 'rxjs/operators';
import { Resolveable, Question, PromptOperator, SideEffectContext, SideEffectCallback } from '../types/core';
import { Maybe } from '../types/utility';
import { cleanArray, ensureArray } from '../utils/array-helpers';
import { resolveDataBuilder } from '../utils/resolve-data';

/**
 * **[NOTE: THIS IS AN INTERNAL OPERATOR - DO NOT USE]**
 *
 * A low-level wrapper for [Enquirer's prompt API](https://github.com/enquirer/enquirer).
 * Prompts for user input and saves the resulting data into props.
 *
 * @param questions - Resolveable array of Enquirer-compatible
 * [question](https://github.com/enquirer/enquirer/#question) objects.
 */
export function prompt<T>(questions: Resolveable<Maybe<Question<T>>, T> | Resolveable<Maybe<Question<T>>[], T>) {
  return (stream => {
    return stream.pipe(
      map(ctx => {
        const result = merge({}, ctx);

        const context: SideEffectContext<T> = {
          sort: 0,
          condition: true,
        };

        const promptCallback: SideEffectCallback<T> = merge(
          async (output, { ask }) => {
            const q = cleanArray(ensureArray(await resolveDataBuilder(output)(questions)));
            const answers = await ask(q);
            merge(output.props, answers);
          },

          context,
        );

        result.prompts.push(promptCallback);

        return result;
      }),
    );
  }) as PromptOperator<T>;
}
