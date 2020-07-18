import { Data as EjsData } from 'ejs';
import { isAbsolute, join } from 'path';
import { ConditionContext, Resolveable, ZombiSideEffectOperator } from '../types';
import { resolveDataBuilder, resolveEjsDataBuilder } from '../utils/resolve-data';
import { getContextualTemplateRootFromStream } from '../utils/resolve-template-root';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

/**
 * Copies files from the template directory to the destination directory.
 *
 * @param from - The template path. A relative path will be automatically resolved
 * to the contextual generator's `templateRoot`.
 * @param to - The destination path. A relative path will be automatically
 * resolved to executing generator's `destinationRoot`.
 * @param data - EJS-compatible data object for injecting additional values
 * into the template file. Props are automatically injected.
 * @param options - Options for customizing file system and side-effect behavior.
 */
export function copy<T>(
  from: Resolveable<string, T>,
  to: Resolveable<string, T>,
  data?: Resolveable<EjsData, T>,
  options?: Resolveable<FSOptions, T>,
): ZombiSideEffectOperator<T> {
  return ((stream, context = { condition: true }) => {
    const templateDir = getContextualTemplateRootFromStream(stream);
    return stream.pipe(
      sideEffect(
        async (output, { fs }) => {
          const resolveData = resolveDataBuilder(output);
          const toPath = await resolveData(to);
          const ejsData = await resolveEjsDataBuilder(output)(data);
          const opts = await resolveData(options);

          const fromData = await resolveData(from);
          const fromPath = isAbsolute(fromData) ? fromData : join(templateDir, fromData);

          await fs.copy(fromPath, toPath, ejsData, opts);
        },
        { condition: context.condition },
      ),
    );
  }) as ZombiSideEffectOperator<T, ConditionContext<T>>;
}
