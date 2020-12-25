import fsExtra from 'fs-extra';
import { renderFile } from 'ejs';
import { isAbsolute, join, resolve as pathResolve } from 'path';
import { isBinary } from 'istextorbinary';
import chalk from 'chalk';
import { isNil, isEmpty } from 'lodash';
import { createPromise } from './utils/create-promise';
import { ZombiContext } from './components/zombi';
import { PromptWrapper } from './types';

export interface FSOptions extends ZombiContext {
  prompt: PromptWrapper;
}

export async function copy(from: string, to: string, options: FSOptions) {
  if (await isFile(from)) {
    await copyFile(from, to, options);
  } else if (isDirectory(from)) {
    await copyDirectory(from, to, options);
  }
}

async function copyFile(from: string, to: string, options: FSOptions) {
  const paths = resolvePaths(from, to, options);

  await createPromise<void>(async (resolve, reject) => {
    const buffer = await fsExtra.readFile(paths.from);

    const shouldRenderEJS =
      !isBinary(paths.from, buffer) ||
      !isBinary(paths.to) ||
      options.data ||
      !isNil(options.data) ||
      !isEmpty(options.data);

    if (shouldRenderEJS) {
      // Render file with EJS processing.
      renderFile(paths.from, options.data || {}, (err, string) => {
        if (err) reject(err);
        outputFile(string, to, options).then(resolve).catch(reject);
      });
    } else {
      // Render file without EJS processing.
      outputFile(buffer, to, options).then(resolve).catch(reject);
    }
  });
}

async function copyDirectory(from: string, to: string, options: FSOptions) {
  const paths = resolvePaths(from, to, options);

  const listing = await fsExtra.readdir(paths.from);

  for (const item of listing) {
    await copy(join(paths.from, item), join(paths.to, item), options);
  }

  if (options.replaceDirectories) {
    const destListing = await fsExtra.readdir(paths.to);

    for (const destItem of destListing) {
      if (!listing.includes(destItem)) {
        await fsExtra.remove(join(paths.to, destItem));
      }
    }
  }
}

async function outputFile(data: any, to: string, options: FSOptions) {
  const prettyTo = prettifyPath(to);
  const doesExist = await fsExtra.pathExists(to);

  if (!options.clobber) {
    if (doesExist) {
      const { overwrite } = await options.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: `Conflict on \`${prettyTo}\` ${chalk.red('\n  Overwrite?')}`,
        initial: false,
      });

      if (overwrite) {
        await fsExtra.outputFile(to, data);
      }
    }
  }

  // Write the file to its destination
  await fsExtra.outputFile(to, data);
}

async function isFile(path: string) {
  const stats = await fsExtra.stat(path);
  return stats.isFile();
}

async function isDirectory(path: string) {
  const stats = await fsExtra.stat(path);
  return stats.isDirectory();
}

function resolvePaths(from: string, to: string, options: FSOptions) {
  return {
    from: isAbsolute(from) ? from : pathResolve(options.templateRoot, from),
    to: isAbsolute(to) ? to : pathResolve(options.destinationRoot, to),
  };
}

function prettifyPath(uglyPath: string) {
  return uglyPath.replace(process.cwd(), '.');
}
