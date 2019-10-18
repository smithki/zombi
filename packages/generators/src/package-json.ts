// --- Imports -------------------------------------------------------------- //

// Node modules
import { basename } from 'path';
import { zombi } from 'zombi';
import { createJson } from 'zombi/operators';
import { getNpmConfig } from './utils/get-npm-config';

// Local modules
import { refineDeep } from 'refine-deep';
import { promptLicense } from './license-file';
import { promptAuthor } from './prompt-author';

// --- Types ---------------------------------------------------------------- //

export interface PackageJsonProps {
  npmOrg: string;
  pkgName: string;
  pkgVersion: string;
  pkgDescription: string;
  pkgLicense: 'MIT' | 'BSD-3';
}

// --- Business logic ------------------------------------------------------- //

/** Prompts for and writes a `package.json` file. */
export const packageJson = zombi<PackageJsonProps>({
  name: 'zombi-package-json',
  templateRoot: false,
})
  .prompt(async ({ props }) => [
    // tslint:disable:prettier
    { name: 'npmOrg', message: 'NPM organization', when: !props.npmOrg },
    { name: 'pkgName', message: 'Package name', default: basename(process.cwd()), when: !props.pkgName },
    { name: 'pkgVersion', message: 'Package version', default: getNpmConfig('init-version') || '0.1.0', when: !props.pkgVersion },
    { name: 'pkgDescription', message: 'Package description', when: !props.pkgDescription },
    // tslint:enable:prettier
  ])
  // Prompt for license information.
  .compose(promptLicense)
  // Prompt for authorship information.
  .compose(promptAuthor)
  .sequence(
    // Ouput the generated `package.json`
    createJson('./package.json', ({ props }) =>
      refineDeep(
        {
          name: `${props.npmOrg ? `@${props.npmOrg}/` : ''}${props.pkgName}`,
          version: props.pkgVersion,
          description: props.pkgDescription,
          author: {
            name: props.authorName || null,
            email: props.authorEmail || null,
            url: props.authorUrl || null,
          },
          license: props.pkgLicense || null,
        },
        { ignoreEmptyStrings: true },
      ),
    ),
  );
