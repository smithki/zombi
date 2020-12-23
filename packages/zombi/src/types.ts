import { Unionize, PromptTypes, PromptOptionsType } from 'listr2';

/**
 * Object describing the shape of an `Enquirer` prompt.
 */
export type Question<Names extends string = string> = Unionize<
  {
    [K in PromptTypes]-?: {
      type: K;
    } & PromptOptionsType<K> & {
        name: Names;
      };
  }
>;

export type Maybe<T> = T | false | null | undefined;
export type Definitely<T> = Exclude<T, false | null | undefined>;
