import React, { createContext, useContext } from 'react';
import { Data as EjsData } from 'ejs';
import { Maybe } from '../types';
import EnquirerWrapper from '../types/enquirer';

export const ZombiContext = createContext<Zombi>(undefined);
export const useZombiContext = () => useContext(ZombiContext);

export interface ZombiFsOptions {
  /**
   * Whether to force overwrites on file conflicts.
   */
  clobber?: boolean;

  /**
   * EJS data to render into the template.
   *
   * If `false`, no EJS syntax is rendered.
   */
  data?: false | EjsData;

  /**
   * When copying directories with this option enabled, files living at the
   * supplied location will be deleted, even if they produce no conflicts.
   */
  replaceDirectories?: boolean;

  /**
   * A wrapper for [Enquirer's prompt API](https://github.com/enquirer/enquirer#-prompts).
   * Prompts for user input and saves the resulting data for EJS rendering.
   */
  prompts?:
    | Maybe<EnquirerWrapper.prompt.Question | EnquirerWrapper.prompt.Question[]>
    | Maybe<EnquirerWrapper.prompt.Question | EnquirerWrapper.prompt.Question[]>[];
}

export interface Zombi extends ZombiFsOptions {
  name?: string;
  templateRoot: string;
  destinationRoot?: string;
}

export const Zombi: React.FC<Zombi> = props => {
  const { children, ...ctx } = props;

  const prevCtx = useZombiContext();

  const finalCtx = {
    ...ctx,
    destinationRoot: prevCtx?.destinationRoot ?? ctx.destinationRoot ?? process.cwd(),
  };

  return <ZombiContext.Provider value={finalCtx}>{children}</ZombiContext.Provider>;
};
