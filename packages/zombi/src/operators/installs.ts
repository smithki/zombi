import { SideEffectOperator } from '../types/core';
import { exec } from './exec';

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(): SideEffectOperator<T> {
  return exec('npm install');
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(): SideEffectOperator<T> {
  return exec('yarn install');
}
