import { zombi } from 'zombi';
import { getNpmConfig } from './utils/get-npm-config';

export interface AuthorshipProps {
  authorName: string;
  authorEmail: string;
  authorUrl: string;
}

/**
 * Prompts for authorship information
 */
export const promptAuthor = zombi<AuthorshipProps>({
  name: 'zombi-prompt-author',
  templateRoot: false,
}).prompt(async ({ props }) => [
  /* eslint-disable prettier/prettier */
  !props.authorName && { type: 'Input', name: 'authorName', message: `Author's name`, initial: getNpmConfig('init-author-name') },
  !props.authorEmail && { type: 'Input', name: 'authorEmail', message: `Author's email`, initial: getNpmConfig('init-author-email') },
  !props.authorUrl && { type: 'Input', name: 'authorUrl', message: `Author's URL`, initial: getNpmConfig('init-author-url') },
  /* eslint-enable prettier/prettier */
]);
