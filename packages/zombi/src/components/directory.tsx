import React, { createContext, useContext } from 'react';
import { Resolveable } from '../types';
import { resolveData } from '../utils/resolve-data';

const PathContext = createContext<string[]>([]);

export function usePathContext() {
  return useContext(PathContext);
}

export interface Directory {
  name: Resolveable<string>;
}

export const Directory: React.FC<Directory> = props => {
  const { name, children } = props;
  const ctx = useContext(PathContext);
  const resolvedName = resolveData(name);
  return <PathContext.Provider value={[...ctx, resolvedName]}>{children}</PathContext.Provider>;
};
