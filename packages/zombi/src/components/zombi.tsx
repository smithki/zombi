import React, { createContext, useContext } from 'react';
import { Data as EjsData } from 'ejs';

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
}

export interface Zombi extends ZombiFsOptions {
  name?: string;
  templateRoot: string;
  destinationRoot: string;
}

export const Zombi: React.FC<Zombi> = props => {
  const { children, templateRoot, destinationRoot } = props;

  const ctx = {
    templateRoot,
    destinationRoot,
  };

  return <ZombiContext.Provider value={ctx}>{children}</ZombiContext.Provider>;
};
