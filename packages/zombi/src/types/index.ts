import EnquirerWrapper from './enquirer';

export type Maybe<T> = T | false | null | undefined;
export type Definitely<T> = Exclude<T, false | null | undefined>;

export type Question = EnquirerWrapper.prompt.Question;
