// --- Imports -------------------------------------------------------------- //

// Local modules
import { zombi } from '../src';
import { licenseFile } from './license-file';
import { packageJson } from './package-json';

// --- Logic ---------------------------------------------------------------- //

/**
 * Generates a minimal node module including the following files:
 * `package.json`, `LICENSE`
 */
export const nodeModule = zombi({
  name: 'zombi-node-module',
  templateRoot: false,
}).compose(packageJson, licenseFile);
