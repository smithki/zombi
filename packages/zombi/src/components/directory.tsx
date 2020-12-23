import React, { createContext, useContext } from 'react';

const PathContext = createContext<string[]>([]);

export function usePathContext() {
  return useContext(PathContext);
}

export interface Directory {
  name: string;
}

export const Directory: React.FC<Directory> = ({ name, children }) => {
  const ctx = useContext(PathContext);

  return <PathContext.Provider value={[...ctx, name]}>{children}</PathContext.Provider>;
};
