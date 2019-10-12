// --- Imports -------------------------------------------------------------- //

// Node modules
import { SpawnOptions } from 'child_process';
import * as spawn from 'cross-spawn';

// Local modules
import { sideEffect } from './side-effect';

// Types
import { ZombiOperator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Run a shell command.
 *
 * @param command - A string representation of the shell command to execute.
 * @param options - Same options that would be passed to Node's `child_process.spawn` or `child_process.spawnSync`.
 */
export function exec<T>(
  command: string,
  options?: SpawnOptions,
): ZombiOperator<T> {
  return sideEffect(async () => {
    try {
      const parts = command.split(' ');
      const cmd = parts.shift();
      const resolvedOptions = { stdio: 'inherit', ...options };
      await spawn.sync(cmd, parts, resolvedOptions);
    } catch (err) {
      throw err;
    }
  });
}
