// tslint:disable:prefer-template

import chalk from 'chalk';
import { SideEffectUtils } from '../types';

const { gray, white, cyan, yellow } = chalk;

export function fsMessages<Props>(utils: SideEffectUtils<Props>) {
  return {
    fileAdd(name: string) {
      utils.status(`${white.bgGreenBright(' ADD ')} ${name}`);
    },

    fileExtend(name: string) {
      utils.status(`${white.bgGreenBright(' EXTEND ')} ${name}`);
    },

    fileOverwrite(name: string) {
      utils.status(`${white.bgRedBright(' OVERWRITTEN ')} ${name}`);
    },

    fileForcedOverwrite(name: string) {
      utils.status(`${white.bgRedBright(' FORCEFULLY OVERWRITTEN ')} ${name}`);
    },

    fileSkip(name: string) {
      utils.status(`${white.bgYellowBright(' SKIP ')} ${name}`);
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
  fsMessages,
  startMessage,
  nothingToDoMessage,
  completedMessage,
};
