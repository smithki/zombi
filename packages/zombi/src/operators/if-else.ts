// --- Imports -------------------------------------------------------------- //

// Node modules
import { Data as EjsData } from 'ejs';
import { isAbsolute, join } from 'path';

// Local modules
import { copyObject } from '../utils/copy-object';
import {
  resolveDataBuilder,
  resolveEjsDataBuilder,
} from '../utils/resolve-data';
import { getContextualTemplateRootFromStream } from '../utils/resolve-template-root';
import { sideEffect } from './side-effect';

// Types
import { FSOptions, GeneratorData, ZombiSideEffectOperator } from '../types';

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
export function ifElse<T>(
  condition: GeneratorData<boolean, T>,
  truthyOperato: GeneratorData<string, T>,
  data?: GeneratorData<EjsData, T>,
  options?: GeneratorData<FSOptions, T>,
): ZombiSideEffectOperator<T> {
  return undefined as any;
  // return stream => {
  //   const source = copyObject(stream);
  //   const templateDir = getContextualTemplateRootFromStream(source);
  //   return source.pipe(sideEffect());
  // };
}
