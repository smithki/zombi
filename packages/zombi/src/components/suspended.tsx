import React, { ReactNode } from 'react';
import { isBoolean, assign } from 'lodash';
import { SUSPENDED_ANSWERS } from '../symbols';
import { useZombiContext, ZombiContext } from './zombi';

/**
 * In the case where top-level prompts are given to `Zombi`, and the `children`
 * of that element are defined as a function, we use this component to deepen
 * the React tree, thus allowing for those prompts to be resolved asynchronously
 * and the prompt answers to be injected.
 */
export const Suspended: React.FC<{ children: (answers: any) => ReactNode }> = props => {
  const { children } = props;

  const ctx = useZombiContext();

  // When top-level prompts are given to `Zombi`, we
  // need to attach the answers to the current context...
  const ctxWithAnswers = {
    ...ctx,
    data: !isBoolean(ctx.data) && assign({}, ctx.data, children[SUSPENDED_ANSWERS]),
  };

  return <ZombiContext.Provider value={ctxWithAnswers}>{children(children[SUSPENDED_ANSWERS])}</ZombiContext.Provider>;
};
