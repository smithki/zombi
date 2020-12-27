import React from 'react';
import { Zombi, useZombiContext } from 'zombi';
import path from 'path';
import { PackageJson } from './package-json';
import { LicenseFile } from './license-file';
import { getNpmConfig } from './utils/get-npm-config';

export const NodeModule: React.FC = () => {
  const ctx = useZombiContext();

  return (
    <Zombi
      name="node-module"
      templateRoot={false}
      prompts={[
        { type: 'input', name: 'npmOrg', message: 'NPM organization' },
        {
          type: 'input',
          name: 'pkgName',
          message: 'Package name',
          initial: ctx?.destinationRoot && path.basename(ctx?.destinationRoot),
        },

        {
          type: 'input',
          name: 'pkgVersion',
          message: 'Package version',
          initial: getNpmConfig('init-version') || '0.1.0',
        },

        { type: 'input', name: 'pkgDescription', message: 'Package description' },

        {
          type: 'select',
          name: 'pkgLicense',
          message: 'Package License',
          choices: ['MIT', 'BSD-3-Clause', 'BSD-2-Clause', 'Apache-2.0'],
          initial: getNpmConfig('init-license') || 'MIT',
        },

        { type: 'input', name: 'authorName', message: `Author's name`, initial: getNpmConfig('init-author-name') },
        { type: 'input', name: 'authorEmail', message: `Author's email`, initial: getNpmConfig('init-author-email') },
        { type: 'input', name: 'authorUrl', message: `Author's URL`, initial: getNpmConfig('init-author-url') },
      ]}
    >
      {({ authorName: name, authorEmail: email, authorUrl: url, ...data }) => (
        <>
          <PackageJson author={{ name, email, url }} {...data} />
          <LicenseFile type={data.pkgLicense} authorName={name} />
        </>
      )}
    </Zombi>
  );
};
