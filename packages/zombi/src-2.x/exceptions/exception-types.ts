export enum ZombiErrorCode {
  TemplateRootAbsolutePathError = 'zombi/TEMPLATE_ROOT_ABSOLUTE_PATH',
  TemplateRootPathNotFoundError = 'zombi/TEMPLATE_ROOT_PATH_NOT_FOUND',
  TemplateRootNonDirectoryError = 'zombi/TEMPLATE_ROOT_NON_DIRECTORY',
}

export interface ZombiError {
  code: ZombiErrorCode;
  readonly isZombiError: true;
}
