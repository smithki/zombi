import React from 'react';
import { kebabCase } from 'lodash';
import { resolve } from 'path';
import { Zombi, Template } from 'zombi';
import { getNpmConfig } from './utils/get-npm-config';

export interface LicenseFile {
  type?: 'MIT' | 'BSD-3-Clause' | 'BSD-2-Clause' | 'Apache-2.0';
  authorName?: string;
}

export const LicenseFile: React.FC<LicenseFile> = props => {
  const {
    type = getNpmConfig<string>('init-license') || 'MIT',
    authorName = getNpmConfig<string>('init-author-name'),
  } = props;

  return (
    <Zombi name="license-file" templateRoot={resolve(__dirname, '..', 'template')}>
      <Template source={`${kebabCase(`${type}-license`)}.txt`} data={{ authorName }} />
    </Zombi>
  );
};
