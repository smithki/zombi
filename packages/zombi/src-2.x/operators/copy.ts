/* eslint-disable prefer-const */

import { Data as EjsData } from 'ejs';
import { isAbsolute, join } from 'path';
import { merge } from 'lodash';
import { Resolveable, SideEffectOperator } from '../types/core';
import { resolveDataBuilder } from '../utils/resolve-data';
import { getContextualTemplateRootFromStream } from '../utils/resolve-template-root';
import { sideEffect } from './side-effect';
import { FSOptions } from '../fs';

interface CopyOptions {
  /**
   * The template path. A relative path will be automatically resolved
   * to the contextual generator's `templateRoot`.
   */
  from: string;

  /**
   * The destination path. A relative path will be automatically
   * resolved to executing generator's `destinationRoot`.
   */
  to: string;

  /**
   * EJS-compatible data object for injecting additional values
   * into the template file. Props are automatically injected.
   */
  data?: EjsData;

  /**
   * Options for customizing file system and side-effect behavior.
   */
  fsOptions?: FSOptions;
}

/**
 * Copies files from the template directory to the destination directory.
 */
export function copy<T>(options: Resolveable<CopyOptions, T>) {
  return ((stream, context) => {
    const templateDir = getContextualTemplateRootFromStream(stream);

    return stream.pipe(
      sideEffect(
        async (output, { fs }) => {
          const resolveData = resolveDataBuilder(output);
          let { to, from, data, fsOptions } = await resolveData(options);
          const dataWithProps = merge({}, output.props, data);
          from = isAbsolute(from) ? from : join(templateDir, from);

          await fs.copy(from, to, dataWithProps, fsOptions);
        },

        { ...context },
      ),
    );
  }) as SideEffectOperator<T>;
}
