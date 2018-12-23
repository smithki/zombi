// --- Imports -------------------------------------------------------------- //

// Node modules
import { exec as execProcess } from 'child_process';

// Local modules
import { sideEffect } from './side-effect';

// Types
import { Operator } from '../types';

// --- Business logic ------------------------------------------------------- //

/**
 * Run a shell command.
 *
 * @param command A string representation of the shell command to execute.
 */
export function exec<T>(command: string): Operator<T> {
  return sideEffect(async () => {
    await execProcess(command);
  });
}
