// tslint:disable:prefer-template

// --- Imports -------------------------------------------------------------- //

// Node modules
import chalk from 'chalk';
import { merge } from 'lodash';

// Local modules
import { status } from './inquirer';

// --- Constants ------------------------------------------------------------ //

const { green, gray, white, cyan, black } = chalk;

// --- Business logic ------------------------------------------------------- //

const renderStatus = (...messages: any[]) => {
  status.updateBottomBar(messages.join(' '));
};

const clearStatus = () => status.updateBottomBar('');

const fileAdd = (name: string) => {
  renderStatus(white.bgGreenBright(' ADD ') + name);
};

const fileExtend = (name: string) => {
  renderStatus(white.bgGreenBright(' EXTEND ') + ' ' + name);
};

const fileOverwrite = (name: string) => {
  renderStatus(white.bgRedBright(' OVERWRITTEN ') + ' ' + name);
};

const fileForcedOverwrite = (name: string) => {
  renderStatus(white.bgRedBright(' FORCEFULLY OVERWRITTEN ') + ' ' + name);
};

const fileSkip = (name: string) => {
  renderStatus(black.bgYellowBright(' SKIP ') + ' ' + name);
};

const completedMessage = timeElapsed => {
  renderStatus(
    green.bold(
      `⚡  It's aliiive! ${gray(`Generated in ${cyan(timeElapsed)}`)}`,
    ),
  );
};

// Merge with standard console
export const log = merge(console.log.bind(console) as typeof console.log, {
  renderStatus,
  clearStatus,
  fileAdd,
  fileExtend,
  fileOverwrite,
  fileForcedOverwrite,
  fileSkip,
  completedMessage,
  ...console,
});
