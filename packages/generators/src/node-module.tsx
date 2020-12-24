import React from 'react';
import path from 'path';
import { Zombi } from 'zombi';
import { PackageJson } from './package-json';
import { LicenseFile } from './license-file';

export interface NodeModule extends PackageJson {}

export const NodeModule: React.FC<NodeModule> = props => {
  const { license, author } = props;

  return (
    <Zombi name="node-module" templateRoot={path.resolve(__dirname, '..', 'template')}>
      <LicenseFile type={license} authorName={author.name} />
      <PackageJson {...props} />
    </Zombi>
  );
};
