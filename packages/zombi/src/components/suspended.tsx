import React, { ReactNode } from 'react';
import { isBoolean, assign, isFunction } from 'lodash';
import type { Data as EjsData } from 'ejs';
import { useZombiContext, ZombiContext } from './zombi';

/**
 * In the case where top-level prompts are given to `Zombi`, and the `children`
 * of that element are defined as a function, we use this component to deepen
 * the React tree, thus allowing for those prompts to be resolved asynchronously
 * and the prompt answers to be injected.
 */
const SuspendedImpl: React.FC<{
  children: ReactNode | ((data: EjsData) => ReactNode) | ((data: EjsData) => Promise<ReactNode>);
}> = (props) => {
  const { children } = props;

  const ctx = useZombiContext()!;

  // When top-level prompts are given to `Zombi`, we
  // need to attach the answers to the current context...
  const ctxWithAnswers: ZombiContext = {
    ...ctx,
    data: !isBoolean(ctx.data) && assign({}, ctx.data, Suspended.answers.get(children)),
  };

  return (
    <ZombiContext.Provider value={ctxWithAnswers}>
      {isFunction(children) ? Suspended.nodes.get(children) : children}
    </ZombiContext.Provider>
  );
};

export const Suspended = assign(SuspendedImpl, {
  answers: new Map<ReactNode | ((data: EjsData) => ReactNode) | ((data: EjsData) => Promise<ReactNode>), EjsData>(),
  nodes: new Map<ReactNode | ((data: EjsData) => ReactNode) | ((data: EjsData) => Promise<ReactNode>), ReactNode>(),
});
