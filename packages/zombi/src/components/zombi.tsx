import React, { createContext, useContext, ReactNode } from 'react';
import { Data as EjsData } from 'ejs';
import { isFunction } from 'lodash';
import { Questions } from '../types';
import { Suspended } from './suspended';

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
  prompts?: Questions;
}

export interface Zombi extends ZombiFsOptions {
  name?: string;
  templateRoot: string;
  destinationRoot?: string;
}

/**
 * The `Zombi` component wraps the root of a scaffolding template. `Zombi`
 * components can be nested as deeply as you like and each one can reference a
 * different template source.
 */
export const Zombi: React.FC<Zombi & { children?: ReactNode | (() => ReactNode) }> = props => {
  const { children, ...ctx } = props;

  const prevCtx = useZombiContext();

  const finalCtx = {
    ...ctx,
    destinationRoot: prevCtx?.destinationRoot ?? ctx.destinationRoot ?? process.cwd(),
    wrappedChildren: () => {},
  };

  return (
    <ZombiContext.Provider value={finalCtx}>
      {isFunction(children) ? <Suspended>{children}</Suspended> : children}
    </ZombiContext.Provider>
  );
};
