// --- Imports -------------------------------------------------------------- //

// Node modules
import caller from 'caller';
import { existsSync, lstatSync } from 'fs-extra';
import { isBoolean, isString } from 'lodash';
import { basename, dirname, isAbsolute, join } from 'path';

// Local modules
import {
  TemplateRootAbsolutePathError,
  TemplateRootNonDirectoryError,
  TemplateRootPathNotFoundError,
} from '../exceptions';

// --- Constants/enums ------------------------------------------------------ //

export enum ResolveTemplateRootDepth {
  FromGenerator = 3,
  FromOperator = 2,
}

// --- Business logic ------------------------------------------------------- //

/**
 * Automatically resolves a valid `template/` path next to the executing
 * generator.
 *
 * @param depth The depth at which to start searching the Error stack.
 * @param current The current `templateRoot` value to resolve against. If
 * explicitly a `boolean` and false, templates are ignored.
 */
export function resolveTemplateRoot(
  startingDepth: ResolveTemplateRootDepth | number,
  current: string | boolean = true,
) {
  // [1] Check the `current` value to determine whether we should proceed
  //     with stack trace calculations.

  // If `templateRoot` is already set to false, keep it that way.
  if (isBoolean(current) && !current) return;

  if (isString(current)) {
    if (!isAbsolute(current)) throw new TemplateRootAbsolutePathError();
    if (!existsSync(current)) {
      throw new TemplateRootPathNotFoundError(
        `${basename(current)}/`,
        current.replace(process.cwd(), '.'),
      );
    }
    if (!lstatSync(current).isDirectory()) {
      throw new TemplateRootNonDirectoryError();
    }

    // The supplied template path is valid!
    return current;
  }

  // [2] Next, if we made it this far, we need to determine the calling module's
  //     path and check for a `template/` directory next to it.

  // Resolve to `depth` of the stack trace using `caller(...)`.
  const callerPath = caller(startingDepth);

  // Collect relavent parent modules.
  const parent = module.parent;
  let deepParent = parent;
  for (let i = 0; i < startingDepth; i++) deepParent = deepParent!.parent;

  const path =
    // If `callerPath` is NOT the same as `dist/core/generator.ts`, then we can
    // be reasonably sure that the `caller(...)` has correctly identified the
    // module in which the generator was invoked.
    callerPath !== parent!.filename
      ? join(dirname(callerPath), 'template')
      : // However, if `callerPath` stictly equals `dist/core/generator`, then we
        // are probably referencing the parent filename at the specified
        // `depth`.
        join(dirname(deepParent!.filename), 'template');

  // Check if the resolved path exists.
  const exists = existsSync(path);

  if (!exists) {
    // Raise error if path is not found.
    throw new TemplateRootPathNotFoundError(
      'template/',
      path.replace(process.cwd(), '.'),
    );
  } else {
    if (lstatSync(path).isDirectory()) {
      // If path is found and IS a directory, then we have our mark!
      return path;
    }

    // If the path is found but IS NOT a directory, then raise an error...
    throw new TemplateRootNonDirectoryError();
  }
}
