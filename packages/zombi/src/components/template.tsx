import React from 'react';
import path from 'path';
import { assign, isBoolean } from 'lodash';
import { usePathContext } from './directory';
import { useZombiContext, ZombiFsOptions } from './zombi';
import { Effect } from './effect';
import { Resolveable } from '../types';
import { resolveData } from '../utils/resolve-data';

export interface Template extends ZombiFsOptions {
  name?: Resolveable<string>;
  source: Resolveable<string>;
}

const TemplateImpl: React.FC<Template> = props => {
  const { name, source, clobber, data, replaceDirectories } = props;

  const ctx = useZombiContext()!;
  const pathCtx = usePathContext();

  const optionsWithOverrides: Effect['options'] = {
    ...ctx,
    clobber: clobber ?? ctx?.clobber,
    data: !isBoolean(data) && assign({}, ctx?.data, data),
    replaceDirectories: replaceDirectories ?? ctx?.replaceDirectories,
    symlink: false,
  };

  const resolvedSource = resolveData(source, optionsWithOverrides.data);
  const resolvedName = resolveData(name, optionsWithOverrides.data);

  return (
    <Effect
      from={path.resolve(ctx.templateRoot, resolvedSource)}
      to={path.resolve(ctx.destinationRoot, ...pathCtx, resolvedName ?? resolvedSource)}
      options={optionsWithOverrides}
    />
  );
};

export interface TemplateSymlink extends Omit<Template, 'data'> {}

const TemplateSymlink: React.FC<TemplateSymlink> = props => {
  const { name, source, clobber, replaceDirectories } = props;

  const ctx = useZombiContext()!;
  const pathCtx = usePathContext();

  const optionsWithOverrides: Effect['options'] = {
    ...ctx,
    clobber: clobber ?? ctx?.clobber,
    data: false,
    replaceDirectories: replaceDirectories ?? ctx?.replaceDirectories,
    symlink: true,
  };

  const resolvedSource = resolveData(source, optionsWithOverrides.data);
  const resolvedName = resolveData(name, optionsWithOverrides.data);

  return (
    <Effect
      from={path.resolve(ctx.templateRoot, resolvedSource)}
      to={path.resolve(ctx.destinationRoot, ...pathCtx, resolvedName ?? resolvedSource)}
      options={optionsWithOverrides}
    />
  );
};

export const Template = Object.assign(TemplateImpl, { Symlink: TemplateSymlink });
