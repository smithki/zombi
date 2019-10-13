// --- Imports -------------------------------------------------------------- //

// Local modules
import { exec } from './exec';

// Types
import { ZombiSideEffectOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(): ZombiSideEffectOperator<T> {
  return exec('npm install');
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(): ZombiSideEffectOperator<T> {
  return exec('yarn install');
}
