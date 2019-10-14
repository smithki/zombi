// --- Imports -------------------------------------------------------------- //

// Node modules
import { Data as EjsData } from 'ejs';
import { isAbsolute, join } from 'path';

// Local modules
import { applyOperatorContext } from '../utils/apply-operator-context';
import {
  resolveDataBuilder,
  resolveEjsDataBuilder,
} from '../utils/resolve-data';
import { getContextualTemplateRootFromStream } from '../utils/resolve-template-root';
import { sideEffect } from './side-effect';

// Types
import {
  ConditionContext,
  FSOptions,
  GeneratorData,
  ZombiSideEffectOperator,
} from '../types';

// --- Business logic ------------------------------------------------------- //

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
  from: GeneratorData<string, T>,
  to: GeneratorData<string, T>,
  data?: GeneratorData<EjsData, T>,
  options?: GeneratorData<FSOptions, T>,
): ZombiSideEffectOperator<T> {
  return ((stream, context) => {
    const templateDir = getContextualTemplateRootFromStream(stream);
    return stream.pipe(
      sideEffect(
        async generator => {
          try {
            const resolveData = resolveDataBuilder(generator);
            const toPath = await resolveData(to);
            const ejsData = await resolveEjsDataBuilder(generator)(data!);
            const opts = await resolveData(options!);

            const fromData = await resolveData(from);
            const fromPath = isAbsolute(fromData)
              ? fromData
              : join(templateDir as string, fromData);

            await generator.fs.copy(fromPath, toPath, ejsData, opts);
          } catch (err) {
            throw err;
          }
        },
        { condition: context.condition },
      ),
    );
  }) as ZombiSideEffectOperator<T, ConditionContext<T>>;
}
