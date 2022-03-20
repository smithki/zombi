/* eslint-disable @typescript-eslint/no-floating-promises */

import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { renderFile } from 'ejs';
import { isNil, isEmpty, isString } from 'lodash';
import { isBinary } from './utils/is-binary';
import { createPromise } from './utils/create-promise';
import { PromptWrapper } from './types';
import { Effect } from './components/effect';
import { ensureArray } from './utils/array-helpers';

type EffectOptions = Effect['options'];

export interface FSOptions extends EffectOptions {
  prompt: PromptWrapper;
}

export async function copy(from: string, to: string, options: FSOptions) {
  const resolvedPaths = resolvePaths(from, to, options);

  if (await isFile(resolvedPaths.from)) {
    await copyFile(resolvedPaths.from, resolvedPaths.to, options);
  } else if (await isDirectory(resolvedPaths.from)) {
    await copyDirectory(resolvedPaths.from, resolvedPaths.to, options);
  }
}

async function copyFile(from: string, to: string, options: FSOptions) {
  const modifier = await options.modifier(to, options.data || {});
  const modifiedFilepath = modifier && !isString(modifier) ? modifier?.filepath : modifier;
  const transformer = (modifier && !isString(modifier) && modifier?.transformer) || undefined;

  if (!modifiedFilepath) return;

  if (options.symlink) {
    return outputSymlink(from, modifiedFilepath, options);
  }

  await createPromise<void>(async (resolve, reject) => {
    const buffer = await fse.readFile(from);

    const shouldRenderEJS =
      !isBinary(from, buffer) &&
      !isBinary(modifiedFilepath) &&
      options.data &&
      !isNil(options.data) &&
      !isEmpty(options.data) &&
      options.ejs;

    if (shouldRenderEJS) {
      // Render file with EJS processing.
      renderFile(from, options.data || {}, async (err, str) => {
        if (err) reject(err);
        try {
          const transformedData = transformer ? await transformer(Buffer.from(str)) : str;
          await outputFile(from, modifiedFilepath, transformedData, options).then(resolve).catch(reject);
        } catch (transformErr: any) {
          reject(transformErr);
        }
      });
    } else {
      // Render file without EJS processing.
      try {
        const transformedData = transformer ? await transformer(buffer) : buffer;
        await outputFile(from, modifiedFilepath, transformedData, options).then(resolve).catch(reject);
      } catch (transformErr: any) {
        reject(transformErr);
      }
    }
  });
}

async function copyDirectory(from: string, to: string, options: FSOptions): Promise<void> {
  if (ensureArray(options.clobber).includes('directories')) {
    await fse.remove(path.join(to));
    return copyDirectory(from, to, {
      ...options,
      clobber: ensureArray(options.clobber)?.filter((i) => i !== 'directories') as any,
    });
  }

  const listing = await fse.readdir(from);
  await Promise.all(
    listing.map(async (item) => {
      await copy(path.join(from, item), path.join(to, item), options);
    }),
  );
}

async function outputFile(from: string, to: string, data: any, options: FSOptions) {
  if (await shouldWriteOutput(to, options)) {
    await fse.outputFile(to, data, { mode: options.permission ?? (await fse.stat(from)).mode });
  }
}

async function outputSymlink(from: string, to: string, options: FSOptions) {
  if (await shouldWriteOutput(to, options)) {
    await fse.ensureDir(path.dirname(to));
    await fse.symlink(from, to);
  }
}

async function shouldWriteOutput(to: string, options: FSOptions) {
  const prettyTo = prettifyPath(to);
  const doesExist = await fse.pathExists(to);

  if (!ensureArray(options.clobber).includes('files')) {
    if (doesExist) {
      const { overwrite } = await options.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: `Conflict on \`${prettyTo}\` ${chalk.red('\n  Overwrite?')}`,
        initial: false,
      });

      return overwrite;
    }
  }

  return true;
}

async function isFile(input: string) {
  const stats = await fse.stat(input);
  return stats.isFile();
}

async function isDirectory(input: string) {
  const stats = await fse.stat(input);
  return stats.isDirectory();
}

function resolvePaths(from: string, to: string, options: FSOptions) {
  return {
    from: path.isAbsolute(from) ? from : path.resolve(options.templateRoot, from),
    to: path.isAbsolute(to) ? to : path.resolve(options.destinationRoot, to),
  };
}

function prettifyPath(uglyPath: string) {
  return uglyPath.replace(process.cwd(), '.');
}
