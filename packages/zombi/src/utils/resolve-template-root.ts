import caller from 'caller';
import { existsSync, lstatSync } from 'fs-extra';
import { isBoolean, isString } from 'lodash';
import { basename, dirname, isAbsolute, join } from 'path';
import {
  TemplateRootAbsolutePathError,
  TemplateRootNonDirectoryError,
  TemplateRootPathNotFoundError,
} from '../exceptions';
import { ZombiStream } from '../types/core';

export enum ResolveTemplateRootDepth {
  FromGenerator = 3,
}

/**
 * Automatically resolves a valid `template/` path next to the executing
 * generator.
 */
export function resolveTemplateRoot(
  current: string | boolean = true,
  startingDepth: ResolveTemplateRootDepth | number = ResolveTemplateRootDepth.FromGenerator,
) {
  // [1] Check the `current` value to determine whether we should proceed
  //     with stack trace calculations.

  // If `templateRoot` is already set to false, keep it that way.
  if (isBoolean(current) && !current) return;

  if (isString(current)) {
    if (!isAbsolute(current)) throw new TemplateRootAbsolutePathError();
    if (!existsSync(current)) {
      throw new TemplateRootPathNotFoundError(`${basename(current)}/`, current.replace(process.cwd(), '.'));
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
  const { parent } = module;
  let deepParent = parent;
  for (let i = 0; i < startingDepth; i++) deepParent = deepParent.parent;

  const path =
    // If `callerPath` is NOT the same as `src/generator.ts`, then we can
    // be reasonably sure that the `caller(...)` has correctly identified the
    // module in which the `Zombi` instance was invoked.
    callerPath !== parent.filename
      ? join(dirname(callerPath), 'template')
      : // However, if `callerPath` stictly equals `src/generator.ts`, then we
        // are probably referencing the parent filename at the specified
        // `depth`.
        join(dirname(deepParent.filename), 'template');

  // Check if the resolved path exists.
  const exists = existsSync(path);

  if (!exists) {
    // Raise error if path is not found.
    throw new TemplateRootPathNotFoundError('template/', path.replace(process.cwd(), '.'));
  } else {
    if (lstatSync(path).isDirectory()) {
      // If path is found and IS a directory, then we have our mark!
      return path;
    }

    // If the path is found but IS NOT a directory, then raise an error...
    throw new TemplateRootNonDirectoryError();
  }
}

/**
 * Gets the `templateRoot` of the currently scoped generator stream, referring
 * to templates that are relevant to the generator currently doing work (even if
 * it's deeply composed into other generators).
 *
 * > **NOTE:** This function should be invoked _outside_ of a `SideEffect`,
 * > usually within the body of a `ZombiOperator` function.
 */
export function getContextualTemplateRootFromStream<TStream extends ZombiStream<any>>(stream: TStream) {
  let templateRoot: string;
  // Since we can resolve `context.templateRoot` synchronously, this will work
  // as expected! Note that if we tried to resolve async data here, it would be
  // impossible...
  stream.subscribe(g => (templateRoot = g.context.templateRoot));
  return templateRoot;
}
