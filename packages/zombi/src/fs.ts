import fsExtra from 'fs-extra';
import { prompt } from 'inquirer';
import { renderFile } from 'ejs';
import path from 'path';
import { isBinary } from 'istextorbinary';
import { isNil, isEmpty } from 'lodash';
import chalk from 'chalk';
import { createPromise } from './utils/create-promise';
import { Zombi } from './components/zombi';

export async function copy(from: string, to: string, options: Zombi) {
  if (await isFile(from)) {
    await copyFile(from, to, options);
  } else if (isDirectory(from)) {
    await copyDirectory(from, to, options);
  }
}

async function isFile(testPath: string) {
  const stats = await fsExtra.stat(testPath);
  return stats.isFile();
}

async function isDirectory(testPath: string) {
  const stats = await fsExtra.stat(testPath);
  return stats.isDirectory();
}

async function copyFile(from: string, to: string, options: Zombi) {
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
        if (err) reject(new Error(paths.to));
        outputFile(string, to, options).then(resolve).catch(reject);
      });
    } else {
      // Render file without EJS processing.
      outputFile(buffer, to, options).then(resolve).catch(reject);
    }
  });
}

async function copyDirectory(from: string, to: string, options: Zombi) {
  const paths = resolvePaths(from, to, options);

  const listing = await fsExtra.readdir(paths.from);

  for (const item of listing) {
    await copy(path.join(paths.from, item), path.join(paths.to, item), options);
  }

  if (options.replaceDirectories) {
    const destListing = await fsExtra.readdir(paths.to);

    for (const destItem of destListing) {
      if (!listing.includes(destItem)) {
        await fsExtra.remove(path.join(paths.to, destItem));
      }
    }
  }
}

async function outputFile(data: any, to: string, options: Zombi) {
  const prettyTo = prettifyPath(to);
  const doesExist = await fsExtra.pathExists(to);

  if (!options.clobber) {
    if (doesExist) {
      const { overwrite } = await prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Conflict on \`${prettyTo}\` ${chalk.red('\n  Overwrite?')}`,
          default: false,
        },
      ]);

      if (overwrite) {
        await fsExtra.outputFile(to, data);
        // this.fsLog.fileOverwrite(prettyTo);
      } else {
        // this.fsLog.fileSkip(prettyTo);
      }

      return;
    }
  }

  // Write the file to its destination
  await fsExtra.outputFile(to, data);

  // if (doesExist) this.fsLog.fileOverwrite(prettyTo);
  // else this.fsLog.fileAdd(prettyTo);
}

function resolvePaths(from: string, to: string, options: Zombi) {
  return {
    from: path.isAbsolute(from) ? from : path.resolve(options.templateRoot, from),
    to: path.isAbsolute(to) ? to : path.resolve(options.destinationRoot, to),
  };
}

function prettifyPath(uglyPath: string) {
  return uglyPath.replace(process.cwd(), '.');
}
