import React from 'react';
import { Zombi } from './zombi';

export interface Effect {
  from: string;
  to: string;
  options: Zombi;
}

export const Effect: React.FC<Effect> = props => {
  return null;
};
