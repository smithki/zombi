// --- Imports -------------------------------------------------------------- //

// Node modules
import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { isAbsolute, join } from 'path';

// Local modules
import {
  resolveDataBuilder,
  resolveEjsDataBuilder,
} from '../utils/resolve-data';
import {
  resolveTemplateRoot,
  ResolveTemplateRootDepth,
} from '../utils/resolve-template-root';
import { sideEffect } from './side-effect';

// Types
import { FSOptions, GeneratorData, Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Copies files from the template directory to the destination directory.
 *
 * @param from The template path. A relative path will be automatically resolved
 * to the calling generator's `templateRoot` (and not the contextual
 * `templateRoot`).
 * @param to The destination path. A relative path will be automatically
 * resolved to the contextual `destinationRoot`.
 * @param data EJS-compatible data object for injecting additional values
 * into the template file. Props are automatically injected.
 */
export function copy<T>(
  from: GeneratorData<string, T>,
  to: GeneratorData<string, T>,
  data?: GeneratorData<EjsData, T>,
  options?: GeneratorData<FSOptions, T>,
): Operator<T> {
  return stream => {
    return stream.pipe(
      sideEffect(async generator => {
        try {
          const resolveData = resolveDataBuilder(generator);
          const toPath = await resolveData(to);
          const ejsData = await resolveEjsDataBuilder(generator)(data!);
          const opts = await resolveData(options!);

          const fromData = await resolveData(from);
          const fromPath = isAbsolute(fromData)
            ? fromData
            : join(generator.context.templateRoot, fromData);

          await generator.fs.copy(fromPath, toPath, ejsData, opts);
        } catch (err) {
          throw err;
        }
      }),
    );
  };
}
