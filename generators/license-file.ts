// --- Imports -------------------------------------------------------------- //

// Node modules
import { kebabCase } from 'lodash';
import { resolve } from 'path';

// Local modules
import { zombi } from '../src';
import { copy, prompt } from '../src/operators';
import { getNpmConfig } from '../src/utils/get-npm-config';
import { PackageJsonProps } from './package-json';
import { promptAuthor } from './prompt-author';

// --- Types ---------------------------------------------------------------- //

export interface LicenseProps extends Pick<PackageJsonProps, 'pkgLicense'> {}

// --- Logic ---------------------------------------------------------------- //

const generator = zombi<LicenseProps>({
  name: 'zombi-license-file',
  // We are starting in `dist/` so we need to travel up an additional directory.
  templateRoot: resolve(__dirname, '..', '..', 'template'),
});

/** Prompts for license information. */
export const promptLicense = generator.sequence(
  prompt(async ({ props }) => ({
    type: 'list',
    name: 'pkgLicense',
    message: 'Package License',
    choices: ['MIT', 'BSD-3-Clause', 'BSD-2-Clause', 'Apache-2.0'],
    default: getNpmConfig('init-license') || 'MIT',
    when: !props.pkgLicense,
  })),
);

/** Generates a LICENSE file. */
export const licenseFile = generator
  .compose(promptLicense)
  .compose(promptAuthor)
  .sequence(
    copy(
      async ({ props }) => kebabCase(props.pkgLicense + '-license') + '.txt',
      'LICENSE',
    ),
  );
