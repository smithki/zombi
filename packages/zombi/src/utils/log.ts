// tslint:disable:prefer-template

import chalk from 'chalk';
import { Tools } from '../types';

const { green, gray, white, cyan, yellow } = chalk;

export function getFSMessages<Props>(tools: Tools<Props>) {
  return {
    fileAdd(name: string) {
      tools.status(`${white.bgGreenBright(' ADD ')} ${name}`);
    },

    fileExtend(name: string) {
      tools.status(`${white.bgGreenBright(' EXTEND ')} ${name}`);
    },

    fileOverwrite(name: string) {
      tools.status(`${white.bgRedBright(' OVERWRITTEN ')} ${name}`);
    },

    fileForcedOverwrite(name: string) {
      tools.status(`${white.bgRedBright(' FORCEFULLY OVERWRITTEN ')} ${name}`);
    },

    fileSkip(name: string) {
      tools.status(`${white.bgYellowBright(' SKIP ')} ${name}`);
    },
  };
}

function startMessage(generatorName: string) {
  console.log(gray('Running generator ') + cyan.bold(generatorName));
}

function nothingToDoMessage() {
  console.log(yellow(`🤷 There's nothing to Generate...`));
}

function completedMessage(timeElapsed: string) {
  console.log(gray(`Generated in ${cyan.bold(timeElapsed)}`));
}

export const log = {
  getFSMessages,
  startMessage,
  nothingToDoMessage,
  completedMessage,
};
