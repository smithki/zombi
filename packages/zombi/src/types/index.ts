import type { Data as EjsData } from 'ejs';
import type EnquirerWrapper from './enquirer';

export type Maybe<T> = T | false | null | undefined;
export type Definitely<T> = Exclude<T, false | null | undefined>;

type StringKeys<T extends EjsData> = Exclude<keyof T, number | symbol>;

export type EnquirerQuestionWrapper<T extends string = string> = Maybe<
  Exclude<EnquirerWrapper.prompt.Question, 'name'> & { name: T }
>;

export interface QuestionsFactory<T extends EjsData = EjsData> {
  (data: T): EnquirerQuestionWrapper<StringKeys<T>> | Array<EnquirerQuestionWrapper<StringKeys<T>>>;
}

export type Questions<T extends EjsData = EjsData> =
  | EnquirerQuestionWrapper<StringKeys<T>>
  | Array<EnquirerQuestionWrapper<StringKeys<T>> | QuestionsFactory<T>>;

export interface PromptWrapper {
  <T extends EjsData>(questions: Questions<T>, initialData?: Maybe<T>): Promise<T>;
  count: number;
}

export type Resolveable<T, D extends EjsData = EjsData> = T | ((data: D) => T);
