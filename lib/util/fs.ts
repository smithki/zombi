// Imports ---------------------------------------------------------------------

// Node modules
import chalk from 'chalk';
import { Data as EjsData, renderFile } from 'ejs';
import {
  existsSync,
  outputFile,
  outputJson,
  readdirSync,
  readJson,
  statSync,
} from 'fs-extra';
import { prompt } from 'inquirer';
import { merge } from 'lodash';
import { isAbsolute, join } from 'path';

// Local modules
import { log } from './log';

// Types
import { GeneratorOutput, JsonData } from '../types';

// Types -----------------------------------------------------------------------

export type SideEffectFunc = (
  generator: GeneratorOutput<any>,
  options?: FSOptions,
) => (...args: any[]) => Promise<any>;

export interface FSOptions {
  force?: boolean;
}

// Constants -------------------------------------------------------------------

const { red } = chalk;

// Helpers ---------------------------------------------------------------------

/** Extract the current generator context. */
const getCtx = (generator, options?: FSOptions) => (
  to: string,
  from?: string,
): any => {
  const { context } = generator;
  if (options) context.force = options.force || context.force;
  return merge(
    {
      to: isAbsolute(to) ? to : context.destination(to),
      from: from && (isAbsolute(from) ? from : context.template(from)),
    },
    context,
  );
};

// Prettify paths for logging.
const prettyPath: {
  [key: string]: (ctx) => string;
} = {
  to: ctx => ctx.to.replace(process.cwd(), '.'),
  from: ctx => ctx.from.replace(process.cwd(), '.'),
};

/** Returns true if path leads to a file. */
const isFile = (path: string) => statSync(path).isFile();
/** Returns true if path leads to a directory. */
const isDirectory = (path: string) => statSync(path).isDirectory();

// Count the number of conflicting files.
let conflictCount = 0;
/** Checks for existing files at the destinationRoot and prompts to overwrite. */
const checkForConflict = ctx => data => async write => {
  const prettyTo = prettyPath.to(ctx);
  const exists = existsSync(ctx.to);

  if (!ctx.force) {
    if (exists) {
      if (conflictCount !== 0) log(); // Add line break for aesthetic

      // Ask if we should overwrite the existing file.
      const { overwrite } = await prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `Conflict on ` + `\`${prettyTo}\`` + red('\n  Overwrite?'),
        default: false,
      });

      if (overwrite) {
        // Overwrite the existing file
        await write();
        log();
        log.fileOverwrite(prettyTo);
      } else {
        // Skip the existing file
        log();
        log.fileSkip(prettyTo);
      }

      // Count the number of conflicts.
      ++conflictCount;

      return;
    }
  }

  // Write file to destination.
  await write();
  if (exists) {
    // Print overwrite message. If we reach this code, we know `ctx.force` is
    // true.
    log.fileForcedOverwrite(prettyTo);
  } else {
    // Print add message.
    log.fileAdd(prettyTo);
  }
};

const output: {
  [key: string]: (ctx) => (data) => Promise<void>;
} = {
  /** Outputs a file to the destination. */
  file: ctx => async data =>
    await checkForConflict(ctx)(data)(
      async () => await outputFile(ctx.to, data),
    ),

  /** Outputs a JSON file to the destination. */
  json: ctx => async data =>
    await checkForConflict(ctx)(data)(
      async () => await outputJson(ctx.to, data, { spaces: 2 }),
    ),

  /** Outputs a modified/extended JSON file to the destination. */
  extendJson: ctx => async data => {
    await outputJson(ctx.to, data, { spaces: 2 });
    log.fileExtend(prettyPath.to(ctx));
  },
};

// FS Operations ---------------------------------------------------------------

/** Copies a file or directory. */
const copy: SideEffectFunc = generator => async (
  from: string,
  to: string,
  data: EjsData,
  options?: FSOptions,
) => {
  try {
    const ctx = getCtx(generator, options)(to, from);

    if (isFile(from)) {
      await copyFile(generator)(ctx.from, ctx.to, data, options);
    } else if (isDirectory(from)) {
      await copyDirectory(generator)(ctx.from, ctx.to, data, options);
    }
  } catch (err) {
    throw err;
  }
};

/** Copies a directory. */
const copyDirectory: SideEffectFunc = generator => async (
  from: string,
  to: string,
  data: EjsData,
  options?: FSOptions,
) => {
  try {
    const listing = readdirSync(from);
    for (const item of listing) {
      await copy(generator)(join(from, item), join(to, item), data, options);
    }
  } catch (err) {
    throw err;
  }
};

/** Copies a file. */
const copyFile: SideEffectFunc = generator => async (
  from: string,
  to: string,
  data: EjsData,
  options?: FSOptions,
) => {
  try {
    const ctx = getCtx(generator, options)(to, from);

    await new Promise(resolve => {
      renderFile(ctx.from, data || {}, async (err, string) => {
        if (err) throw err;
        await output.file(ctx)(string);
        resolve();
      });
    });
  } catch (err) {
    throw err;
  }
};

/** Creates a new file. */
const createFile: SideEffectFunc = generator => async (
  filePath: string,
  content?: any,
  options?: FSOptions,
) => {
  try {
    const ctx = getCtx(generator, options)(filePath);

    await output.file(ctx)(content || '');
  } catch (err) {
    throw err;
  }
};

/** Creates a new, JSON-formatted file. */
const createJson: SideEffectFunc = generator => async (
  filePath: string,
  data?: JsonData,
  options?: FSOptions,
) => {
  try {
    const ctx = getCtx(generator, options)(filePath);

    await output.json(ctx)(data || {});
  } catch (err) {}
};

/** Extends an existing JSON-formatted file. */
const extendJson: SideEffectFunc = generator => async (
  filePath: string,
  extensions: JsonData,
) => {
  try {
    // Get context and JSON data
    const ctx = getCtx(generator)(filePath);
    const json = await readJson(ctx.to);

    merge(json, extensions || {});

    // Write to JSON file
    await output.extendJson(ctx)(json);
  } catch (err) {
    throw err;
  }
};

// EXPORTS ---------------------------------------------------------------------

export { copy, copyDirectory, copyFile, createFile, createJson, extendJson };
