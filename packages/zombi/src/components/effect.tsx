import React, { ReactElement } from 'react';
import { Data as EjsData } from 'ejs';
import { ZombiContext } from './zombi';
import { Maybe } from '../types';

export interface EffectComponent {
  <T extends EjsData>(props: Effect<T>): ReactElement | null;
}

export interface Transformer {
  (buffer: Buffer): Buffer | Promise<Buffer>;
}

export type EffectModifier =
  | Maybe<string>
  | {
      filepath?: Maybe<string>;
      transformer?: Maybe<Transformer>;
    };

export interface Effect<T extends EjsData = EjsData> {
  from: string;
  to: string;
  options: ZombiContext<T> & {
    ejs: boolean;
    symlink: boolean;
    modifier: (filepath: string, data: T) => EffectModifier | Promise<EffectModifier>;
    permission?: number;
  };
}

/**
 * A static representation of "side effects" that are executed by the
 * scaffolding template. Each `Effect` maps to a template file being rendered.
 */
export const Effect: EffectComponent = () => {
  return null;
};
