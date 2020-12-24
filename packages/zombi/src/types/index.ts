import EnquirerWrapper from './enquirer';

export type Maybe<T> = T | false | null | undefined;
export type Definitely<T> = Exclude<T, false | null | undefined>;

export type Questions = Maybe<EnquirerWrapper.prompt.Question> | Maybe<EnquirerWrapper.prompt.Question>[];

export interface PromptWrapper {
  <T = any>(questions: Questions): Promise<T>;
}
