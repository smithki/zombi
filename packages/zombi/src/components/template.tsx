import React from 'react';
import path from 'path';
import { usePathContext } from './directory';
import { useZombiContext, Zombi, ZombiFsOptions } from './zombi';
import { Effect } from './effect';

export interface Template extends ZombiFsOptions {
  name?: string;
  template: string;
}

export const Template: React.FC<Template> = props => {
  const { name, clobber, data, replaceDirectories, template } = props;

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
      from={path.resolve(ctx.templateRoot, template)}
      to={path.resolve(ctx.destinationRoot, ...pathCtx, name ?? path.basename(template))}
      options={optionsWithOverrides}
    />
  );
};
