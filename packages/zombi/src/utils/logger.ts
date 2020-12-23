import chalk from 'chalk';

const { gray, cyan, green, red, yellow } = chalk;

export function fsMessages(stdout: NodeJS.WritableStream) {
  return {
    fileAdd(name: string) {
      stdout.write(`${green.bold('Add')} ${name}`);
    },

    fileOverwrite(name: string) {
      stdout.write(`${red.bold('Overwrite')} ${name}`);
    },

    fileSkip(name: string) {
      stdout.write(`${yellow.bold('Skip')} ${name}`);
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

export const logger = {
  fsMessages,
  startMessage,
  nothingToDoMessage,
  completedMessage,
};
