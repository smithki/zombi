// Imports ---------------------------------------------------------------------

// Node modules
import { basename } from 'path';

// Local modules
import { zombi } from '../lib';
import { Generator } from '../lib/core';
import { licenseFile, LicenseProps } from './license-file';
import { packageJson, PackageJsonProps } from './package-json';
import { AuthorshipProps } from './prompt-author';

// Logic -----------------------------------------------------------------------

/**
 * Generates a minimal node module including the following files:
 * `package.json`, `LICENSE`
 */
export const nodeModule = zombi({
  name: 'zombi-node-module',
  templateRoot: false,
}).compose(packageJson, licenseFile);
