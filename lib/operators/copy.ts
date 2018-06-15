// Imports ---------------------------------------------------------------------

// Node modules
import { Data as EjsData } from 'ejs';
import { merge } from 'lodash';
import { isAbsolute, join } from 'path';

// Local modules
import { copyFile, FSOptions } from '../util/fs';
import { task } from './task';

// Types
import { Data, Operator } from '../types';
import { extractData, extractEjsData } from '../util/extract-data';
import { resolveTemplateRoot } from '../util/resolve-template-root';

// Logic -----------------------------------------------------------------------

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
export const copy = <T>(
  from: Data<string, T>,
  to: Data<string, T>,
  data?: Data<EjsData, T>,
  options?: Data<FSOptions, T>,
): Operator<T> => stream => {
  // Find the `templateRoot` nearest to the calling generator (and not the
  // current context). This enables us to use relative paths in the `from`
  // parameter when copying template files.
  const source = merge({}, stream); // Use a copy of the current stream.
  let templateRoot;
  stream.subscribe(g => (templateRoot = g.context.templateRoot));
  // Depth === 2 because we should be 2 modules away from the generator.
  const templateDir = resolveTemplateRoot(2, templateRoot);

  return stream.pipe(
    task(async generator => {
      try {
        const extract = extractData(generator);
        const toPath = await extract(to);
        const ejsData = await extractEjsData(generator)(data);
        const opts = await extract(options);

        const fromData = await extract(from);
        const fromPath = isAbsolute(fromData)
          ? fromData
          : join(templateDir as string, fromData);

        await copyFile(generator)(fromPath, toPath, ejsData, opts);
      } catch (err) {
        throw err;
      }
    }),
  );
};
