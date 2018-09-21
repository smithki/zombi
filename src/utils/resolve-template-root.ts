// --- Imports -------------------------------------------------------------- //

// Node modules
import * as caller from 'caller';
import chalk from 'chalk';
import { existsSync, lstatSync } from 'fs-extra';
import { isBoolean, isString } from 'lodash';
import { dirname, isAbsolute, join } from 'path';

// Local modules
import { log } from './log';

// --- Constants/enums ------------------------------------------------------ //

const { cyan, gray, green } = chalk;

// Prettify `templateRoot` string (we'll need it for error messages soon).
const templRoot = cyan('templateRoot');

export enum ResolveTemplateRootDepth {
  FromGenerator = 3,
  FromOperator = 2,
}

// --- Logic ---------------------------------------------------------------- //

/**
 * Automatically resolves a valid `template/` path next to the executing
 * generator.
 *
 * @param depth The depth at which to start searching the Error stack.
 * @param current The current `templateRoot` value to resolve against. If false,
 * templates are ignored.
 */
export const resolveTemplateRoot = (
  startingDepth: ResolveTemplateRootDepth | number,
  current: string | boolean = true,
) => {
  // First, we check the `current` value to determine whether we should proceed
  // with stack trace calculations.

  // If `templateRoot` is already set to false, keep it that way.
  if (isBoolean(current) && !current) return false;
  if (isString(current)) {
    // If `templateRoot` is already set to an absolute path, keep it that way...
    if (isAbsolute(current)) return current;
    // ...Otherwise, raise an error.
    const e = new Error(
      `Failed to resolve ${templRoot} because it is not an absolute path.`,
    );
    log.error(e);
    process.exit(1);
  }

  // Next, if we made it this far, we need to determine the calling module's
  // path and check for a `template/` directory next to it.

  // Resolve to `depth` of the stack trace using `caller(...)`.
  const callerPath = caller(startingDepth);

  // Collect relavent parent modules.
  const parent = module.parent;
  let deepParent = parent;
  for (let i = 0; i < startingDepth; i++) deepParent = deepParent.parent;

  const path =
    // If `callerPath` is NOT the same as `dist/core/generator.ts`, then we can
    // be reasonably sure that the `caller(...)` has correctly identified the
    // module in which the generator was invoked.
    callerPath !== parent.filename
      ? join(dirname(callerPath), 'template')
      : // However, if `callerPath` stictly equals `dist/core/generator`, then we
        // are probably referencing the parent filename at the specified
        // `depth`.
        join(dirname(deepParent.filename), 'template');

  // Check if the resolved path exists.
  const exists = existsSync(path);

  // Prettify some more strings in case of error messages.
  const templDir = green('template/');
  const templPath = green(path.replace(process.cwd(), '.'));
  const example =
    gray('zombi(') +
    `{ templateRoot: ${green("'/absolute/path/to/template'")} }` +
    gray(');');
  const boolExample = green('false');

  if (!exists) {
    // Raise error if path is not found.
    const e = new Error(
      `Failed to resolve ${templRoot} at ${templPath}. Ensure there is a ${templDir} directory next to your generator's entry point or set ${templRoot} explicitly like so:\n\n  ${example}\n\nIf your generator does not use or require templates, set ${templRoot} to ${boolExample}\n`,
    );
    log.error(e);
    process.exit(1);
  }

  if (exists) {
    if (lstatSync(path).isDirectory()) {
      // If path is found and IS a directory, then we have our mark!
      return path;
    }
    // If the path is found but IS NOT a directory, then raise an error...
    const e = new Error(
      `Failed to resolve ${templRoot} because it is not a directory.`,
    );
    log.error(e);
    process.exit(1);
  }
};
