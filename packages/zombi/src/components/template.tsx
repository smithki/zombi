import React from 'react';
import path from 'path';
import { assign, isBoolean } from 'lodash';
import { usePathContext } from './directory';
import { useZombiContext, Zombi, ZombiFsOptions } from './zombi';
import { Effect } from './effect';

export interface Template extends ZombiFsOptions {
  name?: string;
  source: string;
}

export const Template: React.FC<Template> = props => {
  const { name, source, clobber, data, replaceDirectories, prompts = [] } = props;

  const ctx = useZombiContext();
  const pathCtx = usePathContext();

  const optionsWithOverrides: Zombi = {
    ...ctx,
    clobber: clobber ?? ctx.clobber,
    data: !isBoolean(data) && assign({}, ctx.data, data),
    replaceDirectories: replaceDirectories ?? ctx.replaceDirectories,
    prompts: ctx.prompts ? [...ctx.prompts, ...prompts] : [...prompts],
  };

  return (
    <Effect
      from={path.resolve(ctx.templateRoot, source)}
      to={path.resolve(ctx.destinationRoot, ...pathCtx, name ?? path.basename(source))}
      options={optionsWithOverrides}
    />
  );
};
