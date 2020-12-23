import React from 'react';
import path from 'path';
import { usePathContext } from './directory';
import { useZombiContext, Zombi, ZombiFsOptions } from './zombi';
import { Effect } from './effect';

export interface Template extends ZombiFsOptions {
  name?: string;
  source: string;
}

export const Template: React.FC<Template> = props => {
  const { name, clobber, data, replaceDirectories, source } = props;

  const ctx = useZombiContext();
  const pathCtx = usePathContext();

  const optionsWithOverrides: Zombi = {
    ...ctx,
    clobber: clobber ?? ctx.clobber,
    data: data ?? ctx.data,
    replaceDirectories: replaceDirectories ?? ctx.replaceDirectories,
  };

  return (
    <Effect
      from={path.resolve(ctx.templateRoot, source)}
      to={path.resolve(ctx.destinationRoot, ...pathCtx, name ?? path.basename(source))}
      options={optionsWithOverrides}
    />
  );
};
