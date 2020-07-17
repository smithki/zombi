import chalk from 'chalk';
import { Data as EjsData, renderFile } from 'ejs';
import { outputFile, outputJson, pathExists, readdir, readFile, remove, stat } from 'fs-extra';
import JSON5 from 'json5';
import { isEmpty, isNil, merge } from 'lodash';
import { isAbsolute, join } from 'path';
import { ExecutingGeneratorContext, FSOptions, GeneratorOutput, JsonData, Tools } from './types';
import { log } from './utils/log';

const { red } = chalk;

export class FileSystem<Props> {
  public static conflictCount = 0;

  constructor(private readonly generator: GeneratorOutput<Props>, private readonly tools: Tools<Props>) {
    this.generator = generator;
  }

  public async isFile(path: string) {
    const stats = await stat(path);
    return stats.isFile();
  }

  public async isDirectory(path: string) {
    const stats = await stat(path);
    return stats.isDirectory();
  }

  public async copy(from: string, to: string, data: EjsData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(to, from);

    if (await this.isFile(from)) {
      await this.copyFile(ctx.from, ctx.to, data, options);
    } else if (this.isDirectory(from)) {
      await this.copyDirectory(ctx.from, ctx.to, data, options);
    }
  }

  public async copyFile(from: string, to: string, data: EjsData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(to, from);

    const renderWithoutEjs = async () => {
      const string = await readFile(ctx.from);
      await this.sideEffects.outputFile(ctx)(string);
    };

    await new Promise(async (resolve, reject) => {
      if (isNil(data) || isEmpty(data) || !ctx.ejs) {
        // Render file without EJS processing.
        renderWithoutEjs().then(resolve).catch(reject);
      } else {
        // Render file with EJS processing.
        renderFile(ctx.from, data || {}, (err, string) => {
          if (err) reject(new Error(ctx.to));
          this.sideEffects.outputFile(ctx)(string).then(resolve).catch(reject);
        });
      }
    });
  }

  public async copyDirectory(from: string, to: string, data: EjsData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(to, from);

    const listing = await readdir(from);
    for (const item of listing) {
      await this.copy(join(from, item), join(to, item), data, options);
    }

    if (ctx.replaceDirectories) {
      const destListing = await readdir(to);
      for (const destItem of destListing) {
        if (!listing.includes(destItem)) await remove(join(to, destItem));
      }
    }
  }

  public async createFile(filePath: string, content?: any, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(filePath);

    await this.sideEffects.outputFile(ctx)(content || '');
  }

  public async createJson(filePath: string, data?: JsonData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(filePath);
    await this.sideEffects.outputJson(ctx)(data || {});
  }

  public async extendJson(filePath: string, extensions: JsonData) {
    // Get context and JSON data
    const ctx = this.getContextBuilder()(filePath);
    const jsonString = await readFile(ctx.to, 'utf8');
    const json = JSON5.parse(jsonString);

    merge(json, extensions || {});

    // Write to JSON file
    await this.sideEffects.extendJson(ctx)(json);
  }

  private get sideEffects() {
    return {
      // Outputs a text file to the destination.
      outputFile: ctx => async data => this.checkForConflicts(ctx, async () => outputFile(ctx.to, data)),

      // Outputs a JSON file to the destination.
      outputJson: ctx => async data => this.checkForConflicts(ctx, async () => outputJson(ctx.to, data, { spaces: 2 })),

      // Outputs a modified/extended JSON file to the destination.
      extendJson: ctx => async data => {
        await outputJson(ctx.to, data, { spaces: 2 });
        log.getFSMessages(this.tools).fileExtend(this.prettifyPath(ctx).to);
      },
    };
  }

  private getContextBuilder(
    options: FSOptions = {},
  ): (to: string, from?: string) => ExecutingGeneratorContext<Props> & FSOptions {
    return (to, from) => {
      const context = { ...this.generator.context };

      const defaultFsOptions: Partial<FSOptions> = {
        ejs: true,
        replaceDirectories: true,
      };
      const defaultToFrom: Partial<ExecutingGeneratorContext<Props>> = {
        to: isAbsolute(to) ? to : context.destination(to),
        from: from && (isAbsolute(from) ? from : context.template(from)),
      };

      return merge(defaultToFrom, context, { ...defaultFsOptions, ...options });
    };
  }

  private async checkForConflicts(ctx: ExecutingGeneratorContext<Props>, write: () => Promise<void>) {
    const prettyTo = this.prettifyPath(ctx).to;
    const doesExist = await pathExists(ctx.to);

    if (!ctx.force) {
      if (doesExist) {
        // Ask if we should overwrite the existing file.
        const { overwrite } = await this.tools.ask({
          type: 'Confirm',
          name: 'overwrite' as any,
          message: `Conflict on \`${prettyTo}\` ${red('\n  Overwrite?')}`,
          initial: false,
        });

        if (overwrite) {
          // Overwrite the existing file
          await write();
          log.getFSMessages(this.tools).fileOverwrite(prettyTo);
        } else {
          // Skip the existing file
          log.getFSMessages(this.tools).fileSkip(prettyTo);
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
      log.getFSMessages(this.tools).fileForcedOverwrite(prettyTo);
    } else {
      // Print add message.
      log.getFSMessages(this.tools).fileAdd(prettyTo);
    }
  }

  private prettifyPath(ctx: ExecutingGeneratorContext<Props>) {
    return {
      to: ctx.to ? ctx.to.replace(process.cwd(), '.') : undefined,
      from: ctx.from ? ctx.from.replace(process.cwd(), '.') : undefined,
    };
  }
}
