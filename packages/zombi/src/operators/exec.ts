import { SpawnOptions } from 'child_process';
import execa from 'execa';
import { Resolveable, SideEffectOperator } from '../types/core';
import { resolveDataBuilder } from '../utils/resolve-data';
import { sideEffect } from './side-effect';

/**
 * Run a shell command.
 *
 * @param command - A string representation of the shell command to execute.
 * @param options - Same options that would be passed to Node's `child_process.spawn` or `child_process.spawnSync`.
 */
export function exec<T>(command: string, options?: Resolveable<SpawnOptions, T>): SideEffectOperator<T> {
  return sideEffect(async (output, { statusIO }) => {
    const resolvedOptions = resolveDataBuilder(output)(options);
    const cp = execa.command(command, { stdio: 'pipe', ...resolvedOptions });
    cp.stdout.pipe(statusIO);
    await cp;
  });
}
