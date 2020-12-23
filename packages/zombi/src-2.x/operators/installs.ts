import { SpawnOptions } from 'child_process';
import { Resolveable } from '../types/core';
import { exec } from './exec';
import { withContext } from './with-context';

/**
 * Install dependencies via NPM.
 */
export function npmInstall<T>(options?: Resolveable<SpawnOptions, T>) {
  return withContext(exec('npm install', options), { label: 'Installing NPM dependencies...' });
}

/**
 * Install dependencies via Yarn.
 */
export function yarnInstall<T>(options?: Resolveable<SpawnOptions, T>) {
  return withContext(exec('yarn install', options), { label: 'Installing Yarn dependencies...' });
}
