// Imports ---------------------------------------------------------------------

// Node modules
import { kebabCase } from 'lodash';
import { resolve } from 'path';

// Local modules
import { zombi } from '../lib';
import { Generator } from '../lib/core';
import { copy, extendJson, prompt } from '../lib/operators';
import { getNpmConfig } from '../lib/util/get-npm-config';
import { PackageJsonProps } from './package-json';
import { AuthorshipProps, promptAuthor } from './prompt-author';

// Interfaces ------------------------------------------------------------------

export interface LicenseProps extends Pick<PackageJsonProps, 'pkgLicense'> {}

// Logic -----------------------------------------------------------------------

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
