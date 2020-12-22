import { basename } from 'path';
import { zombi, createJson } from 'zombi';
import { refineDeep } from 'refine-deep';
import { getNpmConfig } from './utils/get-npm-config';
import { promptLicense } from './license-file';
import { promptAuthor } from './prompt-author';

export interface PackageJsonProps {
  npmOrg: string;
  pkgName: string;
  pkgVersion: string;
  pkgDescription: string;
  pkgLicense: 'MIT' | 'BSD-3-Clause' | 'BSD-2-Clause' | 'Apache-2.0';
}

/**
 * Prompts for and writes a `package.json` file.
 */
export const packageJson = zombi<PackageJsonProps>({
  name: 'zombi-package-json',
  templateRoot: false,
})
  .prompt(({ props, context }) => [
    /* eslint-disable prettier/prettier */
    !props.npmOrg && { type: 'Input', name: 'npmOrg', message: 'NPM organization' },
    !props.pkgName && { type: 'Input', name: 'pkgName', message: 'Package name', initial: basename(context.destination()) },
    !props.pkgVersion && { type: 'Input', name: 'pkgVersion', message: 'Package version', initial: getNpmConfig('init-version') || '0.1.0' },
    !props.pkgDescription && { type: 'Input', name: 'pkgDescription', message: 'Package description' },
    /* eslint-enable prettier/prettier */
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
