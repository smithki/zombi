// --- Imports -------------------------------------------------------------- //

// Node modules
import chalk from 'chalk';
import { Data as EjsData, renderFile } from 'ejs';
import {
  outputFile,
  outputJson,
  pathExists,
  readdir,
  readJson,
  stat,
} from 'fs-extra';
import { prompt } from 'inquirer';
import { merge } from 'lodash';
import { isAbsolute, join } from 'path';
import { promisify } from 'util';

// Internal
import { log } from './utils/log';

// Types
import {
  FSOptions,
  GeneratorContext,
  GeneratorOutput,
  JsonData,
} from './types';

// --- Constants ------------------------------------------------------------ //

const { red } = chalk;

// --- Logic ---------------------------------------------------------------- //

export class FileSystem<Props> {
  // --- Properties --- //

  public static conflictCount: number = 0;
  private generator: GeneratorOutput<Props>;

  constructor(generator: GeneratorOutput<Props>) {
    this.generator = generator;
  }

  // --- Public methods --- //

  public async isFile(path: string) {
    const stats = await stat(path);
    return stats.isFile();
  }

  public async isDirectory(path: string) {
    const stats = await stat(path);
    return stats.isDirectory();
  }

  public async copy(
    from: string,
    to: string,
    data: EjsData,
    options?: FSOptions,
  ) {
    try {
      const ctx = this.getContextBuilder(options)(to, from);

      if (this.isFile(from)) {
        await this.copyFile(ctx.from, ctx.to, data, options);
      } else if (this.isDirectory(from)) {
        await this.copyDirectory(ctx.from, ctx.to, data, options);
      }
    } catch (err) {
      throw err;
    }
  }

  public async copyFile(
    from: string,
    to: string,
    data: EjsData,
    options?: FSOptions,
  ) {
    try {
      const ctx = this.getContextBuilder(options)(to, from);

      await new Promise(resolve => {
        renderFile(ctx.from, data || {}, async (err, string) => {
          if (err) throw err;
          await this.sideEffects.outputFile(ctx)(string);
          resolve();
        });
      });
    } catch (err) {
      throw err;
    }
  }

  public async copyDirectory(
    from: string,
    to: string,
    data: EjsData,
    options?: FSOptions,
  ) {
    try {
      const listing = await readdir(from);
      for (const item of listing) {
        await this.copy(join(from, item), join(to, item), data, options);
      }
    } catch (err) {
      throw err;
    }
  }

  public async createFile(
    filePath: string,
    content?: any,
    options?: FSOptions,
  ) {
    try {
      const ctx = this.getContextBuilder(options)(filePath);

      await this.sideEffects.outputFile(ctx)(content || '');
    } catch (err) {
      throw err;
    }
  }

  public async createJson(
    filePath: string,
    data?: JsonData,
    options?: FSOptions,
  ) {
    try {
      const ctx = this.getContextBuilder(options)(filePath);

      await this.sideEffects.outputJson(ctx)(data || {});
    } catch (err) {}
  }

  public async extendJson(filePath: string, extensions: JsonData) {
    try {
      // Get context and JSON data
      const ctx = this.getContextBuilder()(filePath);
      const json = await readJson(ctx.to);

      merge(json, extensions || {});

      // Write to JSON file
      await this.sideEffects.extendJson(ctx)(json);
    } catch (err) {
      throw err;
    }
  }

  // --- Getters/setters --- //

  private get sideEffects() {
    return {
      // Outputs a text file to the destination.
      outputFile: ctx => async data =>
        await this.checkForConflicts(
          ctx,
          async () => await outputFile(ctx.to, data),
        ),

      // Outputs a JSON file to the destination.
      outputJson: ctx => async data =>
        await this.checkForConflicts(
          ctx,
          async () => await outputJson(ctx.to, data, { spaces: 2 }),
        ),

      // Outputs a modified/extended JSON file to the destination.
      extendJson: ctx => async data => {
        await outputJson(ctx.to, data, { spaces: 2 });
        log.fileExtend(this.prettifyPath(ctx).to);
      },
    };
  }

  // --- Private methods --- //

  private getContextBuilder(
    options?: FSOptions,
  ): (to: string, from?: string) => GeneratorContext<Props> {
    return (to, from) => {
      const { context } = this.generator;
      if (options) context.force = options.force || context.force;
      return merge(
        {
          to: isAbsolute(to) ? to : context.destination(to),
          from: from && (isAbsolute(from) ? from : context.template(from)),
        },
        context,
      );
    };
  }

  private async checkForConflicts(
    ctx: GeneratorContext<Props>,
    write: () => Promise<void>,
  ) {
    const prettyTo = this.prettifyPath(ctx).to;
    const doesExist = await pathExists(ctx.to);

    if (!ctx.force) {
      if (doesExist) {
        if (FileSystem.conflictCount !== 0) log(); // Add line break for aesthetic

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
        ++FileSystem.conflictCount;

        return;
      }
    }

    // Write file to destination.
    await write();
    if (doesExist) {
      // Print overwrite message. If we reach this code, we know `ctx.force` is
      // true.
      log.fileForcedOverwrite(prettyTo);
    } else {
      // Print add message.
      log.fileAdd(prettyTo);
    }
  }

  private prettifyPath(ctx: GeneratorContext<Props>) {
    return {
      to: ctx.to.replace(process.cwd(), '.'),
      from: ctx.from.replace(process.cwd(), '.'),
    };
  }
}
