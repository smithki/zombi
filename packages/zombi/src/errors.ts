import chalk from 'chalk';

// --- Error codes ---------------------------------------------------------- //

export enum ZombiErrorCode {
  TemplateRootAbsolutePathError = 'zombi/TEMPLATE_ROOT_ABSOLUTE_PATH',
  TemplateRootPathNotFoundError = 'zombi/TEMPLATE_ROOT_PATH_NOT_FOUND',
  TemplateRootNonDirectoryError = 'zombi/TEMPLATE_ROOT_NON_DIRECTORY',
}

export interface ZombiError {
  code: ZombiErrorCode;
  readonly isZombiError: true;
}

// --- Error classes -------------------------------------------------------- //

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

  constructor(templPath: string) {
    super(
      `Failed to resolve ${templRoot} at ${green(
        templPath,
      )}. If your scaffold requires templates, set ${templRoot} to an absolute path like so:\n\n  ${gray(
        '<Zombi',
      )} templateRoot: ${green("'/absolute/path/to/template'")}${gray(
        ' />',
      )}\n\nIf your generator does not use or require templates, set ${templRoot} explicitly to ${green('false')}\n`,
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
