import React from 'react';
import { Zombi } from './zombi';

export interface Effect {
  from: string;
  to: string;
  options: Zombi;
}

/**
 * A static representation of "side effects" that are executed by the
 * scaffolding template. Each `Effect` maps to a template file being rendered.
 */
export const Effect: React.FC<Effect> = () => {
  return null;
};
