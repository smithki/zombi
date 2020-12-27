import React from 'react';
import { Data as EjsData } from 'ejs';
import { ZombiContext } from './zombi';

export interface Effect<T extends EjsData = EjsData> {
  from: string;
  to: string;
  options: ZombiContext<T>;
}

/**
 * A static representation of "side effects" that are executed by the
 * scaffolding template. Each `Effect` maps to a template file being rendered.
 */
export const Effect: React.FC<Effect> = () => {
  return null;
};
