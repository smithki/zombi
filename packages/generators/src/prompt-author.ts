// --- Imports -------------------------------------------------------------- //

import { zombi } from '../index';
import { prompt } from '../operators';
import { getNpmConfig } from '../utils/get-npm-config';

// --- Types ---------------------------------------------------------------- //

export interface AuthorshipProps {
  authorName: string;
  authorEmail: string;
  authorUrl: string;
}

// --- Business logic ------------------------------------------------------- //

/** Prompts for authorship information */
export const promptAuthor = zombi<AuthorshipProps>({
  name: 'zombi-prompt-author',
  templateRoot: false,
}).sequence(
  prompt(async ({ props }) => [
    // tslint:disable:prettier
    { name: 'authorName', message: `Author's name`, default: getNpmConfig('init-author-name'), when: !props.authorName, },
    { name: 'authorEmail', message: `Author's email`, default: getNpmConfig('init-author-email'), when: !props.authorEmail },
    { name: 'authorUrl', message: `Author's URL`, default: getNpmConfig('init-author-url'), when: !props.authorUrl },
    // tslint:enable:prettier
  ]),
);
