import React from 'react';
import { ZombiContext } from './zombi';

export interface Effect {
  from: string;
  to: string;
  options: ZombiContext;
}

/**
 * A static representation of "side effects" that are executed by the
 * scaffolding template. Each `Effect` maps to a template file being rendered.
 */
export const Effect: React.FC<Effect> = () => {
  return null;
};
