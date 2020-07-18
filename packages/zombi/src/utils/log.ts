import chalk from 'chalk';

const { gray, cyan, green, red, yellow } = chalk;

export function fsMessages(io: NodeJS.WritableStream) {
  return {
    fileAdd(name: string) {
      io.write(`${green.bold('Add')} ${name}`);
    },

    fileExtend(name: string) {
      io.write(`${green.bold('Extend')} ${name}`);
    },

    fileOverwrite(name: string) {
      io.write(`${red.bold('Overwrite')} ${name}`);
    },

    fileSkip(name: string) {
      io.write(`${yellow.bold('Skip')} ${name}`);
    },
  };
}

function startMessage(name: string) {
  console.log(gray('Running generator ') + cyan.bold(name));
}

function nothingToDoMessage() {
  console.log(yellow(`🤷 There's nothing to generate...`));
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
