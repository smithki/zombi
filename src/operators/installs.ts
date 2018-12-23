// --- Imports -------------------------------------------------------------- //

// Local modules
import { exec } from './exec';

// Types
import { Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(): Operator<T> {
  return exec('npm install');
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(): Operator<T> {
  return exec('yarn install');
}
