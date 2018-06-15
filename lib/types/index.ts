// Imports ---------------------------------------------------------------------

import { Question as InquirerQuestion } from 'inquirer';
import { UnaryFunction as RxUnaryFunction } from 'rxjs/interfaces';
import { Observable as RxObservable } from 'rxjs/Observable';
import { Generator } from '../core/generator';

// Core types ------------------------------------------------------------------

/** */
export interface GeneratorOutput<Props> {
  context: Pick<
    Generator<Props>,
    | 'name'
    | 'templateRoot'
    | 'destinationRoot'
    | 'template'
    | 'destination'
    | 'force'
  >;
  props: Props;
  prompts: Task<Props>[];
  sequence: Task<Props>[];
}

/** */
export interface Options<Props>
  extends Partial<
      Pick<Generator<Props>, 'name' | 'templateRoot' | 'destinationRoot'>
    > {
  initialProps?: Props | Partial<Props>;
  force?: boolean;
  silent?: boolean;
}

/** */
export interface Operator<T, R = T>
  extends RxUnaryFunction<Stream<T>, Stream<T>> {}

/** */
export interface Task<Props> extends Callback<Props>, TaskOptions {}

/** */
export interface TaskOptions {
  enforcePre?: boolean;
}

/** */
export interface Callback<Props, R = void> {
  (generator: GeneratorOutput<Props>): Promise<R>;
}

/** */
export interface Stream<Props> extends RxObservable<GeneratorOutput<Props>> {}

/** */
export interface Question<Props> extends InquirerQuestion {
  name?: keyof Props;
}

// Data types ------------------------------------------------------------------

/** */
export type Data<R, Props> = R | Callback<Props, R>;

/** */
export interface JsonData {
  [key: string]: any;
}
