// --- Imports -------------------------------------------------------------- //

// Node modules
import chalk from 'chalk';
import { merge } from 'lodash';

// --- Constants ------------------------------------------------------------ //

const { green, magenta, gray, red, yellow } = chalk;

// --- Business logic ------------------------------------------------------- //

let silent = false;
export const setSilent = (value: boolean) => (silent = value);

const doLog = (message?: any, ...optionalParams: any[]) => {
  if (!silent) console.log(message || '', ...optionalParams);
};

const fileAdd = (name: string) => doLog(green('+ ') + name);

const fileExtend = (name: string) =>
  doLog(magenta('+ ') + name + gray(' (extended)'));

const fileOverwrite = (name: string) =>
  doLog(red('+ ') + name + gray(' (overwritten)'));

const fileForcedOverwrite = (name: string) =>
  doLog(red('+ ') + name + gray(' (forcefully overwritten)'));

const fileSkip = (name: string) =>
  doLog(yellow('x ') + name + gray(' (skipped)'));

// Merge with standard console
export const log = merge(doLog, {
  fileAdd,
  fileExtend,
  fileOverwrite,
  fileForcedOverwrite,
  fileSkip,
  ...console,
});
