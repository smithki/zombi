import { Data as EjsData } from 'ejs';
import EnquirerWrapper from './enquirer';

export type Maybe<T> = T | false | null | undefined;
export type Definitely<T> = Exclude<T, false | null | undefined>;

export type Questions<T extends string = string> =
  | Maybe<Exclude<EnquirerWrapper.prompt.Question, 'name'> & { name: T }>
  | Maybe<Exclude<EnquirerWrapper.prompt.Question, 'name'> & { name: T }>[];

export interface PromptWrapper {
  <T = any>(questions: Questions): Promise<T>;
}

export type Resolveable<T> = T | ((data: EjsData) => T);
