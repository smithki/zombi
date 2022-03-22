import React, { createContext, useContext, ReactNode, ReactElement } from 'react';
import type { Data as EjsData } from 'ejs';
import { isBoolean, assign } from 'lodash';
import type { Questions, Maybe } from '../types';
import { Suspended } from './suspended';

export type ZombiContext<T extends EjsData = EjsData> = Zombi<T> & {
  templateRoot: string;
  destinationRoot: string;
};

export const ZombiContext = createContext<ZombiContext | undefined>(undefined);

export function useZombiContext<T extends EjsData = EjsData>() {
  return useContext(ZombiContext) as ZombiContext<T>;
}

export interface ZombiFsOptions<T extends EjsData = EjsData> {
  /**
   * Configure "clobbering" behavior for files & directories.
   *
   *  - `"files"`        -  Force overwrites upon file conflicts.
   *  - `"directories"`  -  Files at the destination location will be removed,
   *                        otherwise directories will be merged, recursively.
   */
  clobber?: 'files' | 'directories' | Array<'files' | 'directories'>;

  /**
   * EJS data to render into the template.
   * If `false`, EJS rendering is skipped.
   */
  data?: Maybe<T>;
}

export interface Zombi<T extends EjsData = EjsData> extends ZombiFsOptions<T> {
  name: string;
  templateRoot: Maybe<string>;
  destinationRoot?: string;

  /**
   * A wrapper for [Enquirer's prompt API](https://github.com/enquirer/enquirer#-prompts).
   * Prompts for user input and saves the resulting data for EJS rendering.
   */
  prompts?: Questions<T>;

  onPromptResponse?: (data: T) => void | Promise<void>;
}

export interface ZombiComponent {
  <T extends EjsData>(
    props: Zombi<T> & { children?: ReactNode | ((data: T) => ReactNode) | ((data: T) => Promise<ReactNode>) },
  ): ReactElement | null;
}

/**
 * The `Zombi` component wraps the root of a scaffolding template. `Zombi`
 * components can be nested as deeply as you like and each one can reference a
 * different template source.
 */
export const Zombi: ZombiComponent = (props) => {
  const { children, ...ctx } = props;

  const prevCtx = useZombiContext();

  const finalCtx: ZombiContext<any> = {
    ...ctx,
    data: !isBoolean(ctx.data) && assign({}, ctx?.data, prevCtx?.data),
    templateRoot: ctx.templateRoot || process.cwd(),
    destinationRoot: prevCtx?.destinationRoot ?? ctx.destinationRoot ?? process.cwd(),
  };

  return (
    <ZombiContext.Provider value={finalCtx}>
      <Suspended>{children}</Suspended>
    </ZombiContext.Provider>
  );
};
