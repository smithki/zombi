import chalk from 'chalk';
import { ZombiError, ZombiErrorCode } from './exception-types';

const { cyan, gray, green } = chalk;

// Prettify `templateRoot` string.
const templRoot = cyan('templateRoot');

export class TemplateRootAbsolutePathError extends TypeError implements ZombiError {
  readonly isZombiError = true;
  code = ZombiErrorCode.TemplateRootAbsolutePathError;
  name = 'TemplateRootAbsolutePathError';

  constructor() {
    super(`Failed to resolve ${templRoot} because it is not an absolute path.`);
  }
}

export class TemplateRootPathNotFoundError extends TypeError implements ZombiError {
  readonly isZombiError = true;
  code = ZombiErrorCode.TemplateRootPathNotFoundError;
  name = 'TemplateRootPathNotFoundError';

  constructor(templDir: string, templPath: string) {
    super(
      `Failed to resolve ${templRoot} at ${green(templPath)}. Ensure there is a ${green(
        templDir,
      )} directory next to your generator's entry point or set ${templRoot} explicitly like so:\n\n  ${gray(
        'zombi(',
      )} { templateRoot: ${green("'/absolute/path/to/template'")} } ${gray(
        ');',
      )}\n\nIf your generator does not use or require templates, set ${templRoot} to ${green('false')}\n`,
    );
  }
}

export class TemplateRootNonDirectoryError extends TypeError implements ZombiError {
  readonly isZombiError = true;
  code = ZombiErrorCode.TemplateRootNonDirectoryError;
  name = 'TemplateRootNonDirectoryError';

  constructor() {
    super(`Failed to resolve ${templRoot} because it is not a directory.`);
  }
}
