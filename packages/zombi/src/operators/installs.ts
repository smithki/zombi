import { SpawnOptions } from 'child_process';
import { Resolveable, SideEffectOperator } from '../types/core';
import { exec } from './exec';

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(options?: Resolveable<SpawnOptions, T>): SideEffectOperator<T> {
  return exec('npm install', options);
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(options?: Resolveable<SpawnOptions, T>): SideEffectOperator<T> {
  return exec('yarn install', options);
}
