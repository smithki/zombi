import React from 'react';
import path from 'path';
import { Zombi, Template, useZombiContext } from 'zombi';
import { getNpmConfig } from './utils/get-npm-config';
import { LicenseFile } from './license-file';

export interface PackageJson {
  npmOrg?: string;
  packageName?: string;
  version?: string;
  description?: string;
  license?: LicenseFile['type'];
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
}

export const PackageJson: React.FC<PackageJson> = props => {
  const ctx = useZombiContext();

  const {
    npmOrg,
    packageName = path.basename(ctx.destinationRoot),
    version,
    description,
    license,
    author: partialAuthor,
  } = props;

  const author = {
    name: getNpmConfig<string>('init-author-name'),
    email: getNpmConfig<string>('init-author-email'),
    url: getNpmConfig<string>('init-author-url'),
    ...partialAuthor,
  };

  const data = {
    name: `${npmOrg ? `@${npmOrg}/` : ''}${packageName}`,
    version: version ?? (getNpmConfig('init-version') || '0.1.0'),
    description: description ?? '',
    author: [author.name, author.email && `<${author.email}>`, author.url && `(${author.url})`]
      .filter(Boolean)
      .join(' '),
    license,
  };

  return (
    <Zombi name="package-json" templateRoot={path.resolve(__dirname, '..', 'template')}>
      <Template source="package.json" data={data} />
    </Zombi>
  );
};
