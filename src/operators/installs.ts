// --- Imports -------------------------------------------------------------- //

// Node modules
import { exec } from 'child_process';

// Local modules
import { sideEffect } from './side-effect';

// Types
import { Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(): Operator<T> {
  return sideEffect(async () => {
    await exec(`npm install`);
  });
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(): Operator<T> {
  return sideEffect(async () => {
    await exec(`yarn install`);
  });
}
