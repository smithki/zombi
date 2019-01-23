export enum ZombiErrorCode {
  TemplateRootAbsolutePathError = 'ZOMBI_TEMPLATE_ROOT_ABSOLUTE_PATH',
  TemplateRootPathNotFoundError = 'ZOMBI_TEMPLATE_ROOT_PATH_NOT_FOUND',
  TemplateRootNonDirectoryError = 'ZOMBI_TEMPLATE_ROOT_NON_DIRECTORY',
}

export interface ZombiError {
  code: ZombiErrorCode;
}
