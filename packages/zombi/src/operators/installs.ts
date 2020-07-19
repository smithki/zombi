import { ZombiSideEffectOperator } from '../types';
import { exec } from './exec';

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
