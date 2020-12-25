import chalk from 'chalk';

const { gray, cyan, yellow } = chalk;

function startMessage(name?: string) {
  console.log(gray('Running generator') + (name ? ` ${cyan.bold(name)}` : ''));
}

function nothingToDoMessage() {
  console.log(yellow(`🤷 There's nothing to generate...`));
}

function completedMessage(timeElapsed: string) {
  console.log(gray(`Generated in ${cyan.bold(timeElapsed)}`));
}

export const logger = {
  startMessage,
  nothingToDoMessage,
  completedMessage,
};
