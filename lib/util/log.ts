// Imports ---------------------------------------------------------------------

import chalk from 'chalk';
import { merge, omit } from 'lodash';

// Constants -------------------------------------------------------------------

const { green, magenta, gray, red, yellow } = chalk;

// Logic -----------------------------------------------------------------------

let silent = false;
export const setSilent = (value: boolean) => (silent = value);

// Custom log functions

const doLog = (message?: any, ...optionalParams: any[]) => {
  if (!silent) console.log(message || '', ...optionalParams);
};

//
const fileAdd = (name: string) => doLog(green('+ ') + name);

//
const fileExtend = (name: string) =>
  doLog(magenta('+ ') + name + gray(' (extended)'));

//
const fileOverwrite = (name: string) =>
  doLog(red('+ ') + name + gray(' (overwritten)'));

//
const fileForcedOverwrite = (name: string) =>
  doLog(red('+ ') + name + gray(' (forcefully overwritten)'));

//
const fileSkip = (name: string) =>
  doLog(yellow('x ') + name + gray(' (skipped)'));

// Merge with standard console
export const log = merge(doLog, {
  fileAdd,
  fileExtend,
  fileOverwrite,
  fileForcedOverwrite,
  fileSkip,
  ...omit(console, 'log'),
});
