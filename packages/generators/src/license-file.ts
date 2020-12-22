import { kebabCase } from 'lodash';
import { resolve } from 'path';
import { zombi, copy } from 'zombi';
import { PackageJsonProps } from './package-json';
import { promptAuthor } from './prompt-author';
import { getNpmConfig } from './utils/get-npm-config';

export interface LicenseProps extends Pick<PackageJsonProps, 'pkgLicense'> {}

const generator = zombi<LicenseProps>({
  name: 'zombi-license-file',
  // NOTE: We are starting in `dist/__dirname`
  templateRoot: resolve(__dirname, '..', 'template'),
});

/**
 * Prompts for license information.
 */
export const promptLicense = generator.prompt(({ props }) => [
  !props.pkgLicense && {
    type: 'List',
    name: 'pkgLicense',
    message: 'Package License',
    choices: ['MIT', 'BSD-3-Clause', 'BSD-2-Clause', 'Apache-2.0'],
    initial: getNpmConfig('init-license') || 'MIT',
  },
]);

/**
 * Generates a LICENSE file.
 */
export const licenseFile = generator.compose([promptLicense, promptAuthor]).pipe(
  copy(({ props }) => ({
    from: `${kebabCase(`${props.pkgLicense}-license`)}.txt`,
    to: 'LICENSE',
  })),
);
