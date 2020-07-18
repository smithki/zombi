import chalk from 'chalk';
import { Data as EjsData, renderFile } from 'ejs';
import * as fsExtra from 'fs-extra';
import JSON5 from 'json5';
import { isEmpty, isNil, merge } from 'lodash';
import { isAbsolute, join } from 'path';
import { ZombiStreamOutput, JsonData, SideEffectUtils } from './types';
import { log } from './utils/log';
import { Zombi } from './generator';

const { red } = chalk;

/**
 * Options given to `FileSystem` methods that render _new_ files.
 */
export interface FSOptions {
  /**
   * Whether to force overwrites on file conflicts.
   */
  clobber?: boolean;

  /**
   * Whether to render a file with EJS data.
   */
  ejs?: boolean;

  /**
   * When copying directories with this option enabled, files living at the
   * supplied location will be deleted, even if they produce no conflicts.
   */
  replaceDirectories?: boolean;
}

/**
 * Values provided to the stream picked from the executing `Generator` instance
 * (referring to the instance that invoked `Generator.run()`).
 */
export interface FSContext<Props>
  extends Pick<Zombi<Props>, 'name' | 'templateRoot' | 'destinationRoot' | 'template' | 'destination' | 'clobber'> {
  to?: string;
  from?: string;
}

export class FileSystem<Props> {
  public static conflictCount = 0;
  private fsLog: ReturnType<typeof log['fsMessages']>;

  constructor(private readonly generator: ZombiStreamOutput<Props>, private readonly utils: SideEffectUtils<Props>) {
    this.generator = generator;
    this.fsLog = log.fsMessages(this.utils.statusIO);
  }

  public async isFile(path: string) {
    const stats = await fsExtra.stat(path);
    return stats.isFile();
  }

  public async isDirectory(path: string) {
    const stats = await fsExtra.stat(path);
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
      const string = await fsExtra.readFile(ctx.from);
      await this.effects.outputFile(ctx)(string);
    };

    await new Promise(async (resolve, reject) => {
      if (isNil(data) || isEmpty(data) || !ctx.ejs) {
        // Render file without EJS processing.
        renderWithoutEjs().then(resolve).catch(reject);
      } else {
        // Render file with EJS processing.
        renderFile(ctx.from, data || {}, (err, string) => {
          if (err) reject(new Error(ctx.to));
          this.effects.outputFile(ctx)(string).then(resolve).catch(reject);
        });
      }
    });
  }

  public async copyDirectory(from: string, to: string, data: EjsData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(to, from);

    const listing = await fsExtra.readdir(from);
    for (const item of listing) {
      await this.copy(join(from, item), join(to, item), data, options);
    }

    if (ctx.replaceDirectories) {
      const destListing = await fsExtra.readdir(to);
      for (const destItem of destListing) {
        if (!listing.includes(destItem)) await fsExtra.remove(join(to, destItem));
      }
    }
  }

  public async createFile(filePath: string, content?: any, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(filePath);
    await this.effects.outputFile(ctx)(content || '');
  }

  public async createJson(filePath: string, data?: JsonData, options?: FSOptions) {
    const ctx = this.getContextBuilder(options)(filePath);
    await this.effects.outputJson(ctx)(data || {});
  }

  public async extendJson(filePath: string, extensions: JsonData) {
    // Get context and JSON data
    const ctx = this.getContextBuilder()(filePath);
    const jsonString = await fsExtra.readFile(ctx.to, 'utf8');
    const json = JSON5.parse(jsonString);

    merge(json, extensions || {});

    // Write to JSON file
    await this.effects.extendJson(ctx)(json);
  }

  private get effects() {
    return {
      // Outputs a text file to the destination.
      outputFile: (ctx: FSContext<Props>) => async (data: any) =>
        this.checkForConflicts(ctx, async () => fsExtra.outputFile(ctx.to, data)),

      // Outputs a JSON file to the destination.
      outputJson: (ctx: FSContext<Props>) => async (data: any) =>
        this.checkForConflicts(ctx, async () => fsExtra.outputJson(ctx.to, data, { spaces: 2 })),

      // Outputs a modified/extended JSON file to the destination.
      extendJson: (ctx: FSContext<Props>) => async (data: any) => {
        await fsExtra.outputJson(ctx.to, data, { spaces: 2 });
        this.fsLog.fileExtend(this.prettifyPath(ctx).to);
      },
    };
  }

  private getContextBuilder(options: FSOptions = {}): (to: string, from?: string) => FSContext<Props> & FSOptions {
    return (to, from) => {
      const context = { ...this.generator.context };

      const defaultFsOptions: Partial<FSOptions> = {
        ejs: true,
        replaceDirectories: true,
      };

      const defaultToFrom: Partial<FSContext<Props>> = {
        to: isAbsolute(to) ? to : context.destination(to),
        from: from && (isAbsolute(from) ? from : context.template(from)),
      };

      return merge(defaultToFrom, context, { ...defaultFsOptions, ...options });
    };
  }

  private async checkForConflicts(ctx: FSContext<Props>, write: () => Promise<void>) {
    const prettyTo = this.prettifyPath(ctx).to;
    const doesExist = await fsExtra.pathExists(ctx.to);

    if (!ctx.clobber) {
      if (doesExist) {
        const { overwrite } = await this.utils.ask({
          type: 'Confirm',
          name: 'overwrite' as any,
          message: `Conflict on \`${prettyTo}\` ${red('\n  Overwrite?')}`,
          initial: false,
        });

        if (overwrite) {
          await write();
          this.fsLog.fileOverwrite(prettyTo);
        } else {
          this.fsLog.fileSkip(prettyTo);
        }

        // Count the number of conflicts.
        ++FileSystem.conflictCount;

        return;
      }
    }

    await write();

    if (doesExist) this.fsLog.fileOverwrite(prettyTo);
    else this.fsLog.fileAdd(prettyTo);
  }

  private prettifyPath(ctx: FSContext<Props>) {
    return {
      to: ctx.to ? ctx.to.replace(process.cwd(), '.') : undefined,
      from: ctx.from ? ctx.from.replace(process.cwd(), '.') : undefined,
    };
  }
}
