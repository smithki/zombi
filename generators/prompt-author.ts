// Imports ---------------------------------------------------------------------

import { zombi } from '../lib/';
import { Generator } from '../lib/core';
import { prompt } from '../lib/operators';
import { getNpmConfig } from '../lib/util/get-npm-config';

// Interfaces ------------------------------------------------------------------

export interface AuthorshipProps {
  authorName: string;
  authorEmail: string;
  authorUrl: string;
}

// Logic -----------------------------------------------------------------------

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
