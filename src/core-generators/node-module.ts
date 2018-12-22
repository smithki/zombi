// --- Imports -------------------------------------------------------------- //

// Local modules
import { zombi } from '../index';
import { licenseFile } from './license-file';
import { packageJson } from './package-json';

// --- Business logic ------------------------------------------------------- //

/**
 * Generates a minimal node module including the following files:
 * `package.json`, `LICENSE`
 */
export const nodeModule = zombi({
  name: 'zombi-node-module',
  templateRoot: false,
}).compose(
  packageJson,
  licenseFile,
);
