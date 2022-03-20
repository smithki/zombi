import React, { createContext, ReactElement, ReactNode, useContext } from 'react';
import { Data as EjsData } from 'ejs';
import { assign } from 'lodash';
import { Resolveable } from '../types';
import { resolveData } from '../utils/resolve-data';
import { useZombiContext } from './zombi';

const PathContext = createContext<string[]>([]);

export function usePathContext() {
  return useContext(PathContext);
}

export interface DirectoryComponent {
  <T extends EjsData>(props: Directory<T> & { children?: ReactNode }): ReactElement | null;
}

export interface Directory<T extends EjsData = EjsData> {
  name: Resolveable<string, T>;
}

export const Directory: DirectoryComponent = (props) => {
  const { name, children } = props;
  const ctx = useZombiContext();
  const pathCtx = useContext(PathContext);
  const resolvedName = resolveData(name, assign({}, ctx.data));
  return <PathContext.Provider value={[...pathCtx, resolvedName]}>{children}</PathContext.Provider>;
};
