// --- Imports -------------------------------------------------------------- //

// Local modules
import { exec } from './exec';

// Types
import { ZombiOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(): ZombiOperator<T> {
  return exec('npm install');
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(): ZombiOperator<T> {
  return exec('yarn install');
}
