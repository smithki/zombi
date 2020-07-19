import { SpawnOptions } from 'child_process';
import execa from 'execa';
import { ZombiSideEffectOperator } from '../types';
import { sideEffect } from './side-effect';

/**
 * Run a shell command.
 *
 * @param command - A string representation of the shell command to execute.
 * @param options - Same options that would be passed to Node's `child_process.spawn` or `child_process.spawnSync`.
 */
export function exec<T>(command: string, options?: SpawnOptions): ZombiSideEffectOperator<T> {
  return sideEffect(async (_, { statusIO }) => {
    const cp = execa.command(command, { stdio: 'pipe', ...options });
    cp.stdout.pipe(statusIO);
    await cp;
  });
}
