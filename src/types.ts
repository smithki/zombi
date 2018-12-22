// --- Imports -------------------------------------------------------------- //

// Node modules
import { Question as InquirerQuestion } from 'inquirer';
import {
  Observable as RxObservable,
  UnaryFunction as RxUnaryFunction,
} from 'rxjs';

// Local modules
import { FileSystem } from './fs';
import { Generator } from './generator';

// --- Core types ----------------------------------------------------------- //

// @TODO: Add doc comments to each of these types.

export interface GeneratorContext<Props>
  extends Pick<
    Generator<Props>,
    | 'name'
    | 'templateRoot'
    | 'destinationRoot'
    | 'template'
    | 'destination'
    | 'force'
  > {
  to?: string;
  from?: string;
}

/** */
export interface GeneratorOutput<Props> {
  context: GeneratorContext<Props>;
  props: Props;
  prompts: Task<Props>[];
  sequence: Task<Props>[];
  fs: FileSystem<Props>;
}

/** */
export interface GeneratorConfig<Props>
  extends Partial<
    Pick<Generator<Props>, 'name' | 'templateRoot' | 'destinationRoot'>
  > {
  initialProps?: Props | Partial<Props>;
  force?: boolean;
  silent?: boolean;
}

export interface FSOptions {
  force?: boolean;
}

/** */
export interface Operator<T> extends RxUnaryFunction<Stream<T>, Stream<T>> {}

/** */
export interface Task<Props>
  extends Callback<Props>,
    SideEffectOperatorOptions {}

/** */
export interface SideEffectOperatorOptions {
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
  name?: Extract<keyof Props, string>;
}

// --- Data-types ----------------------------------------------------------- //

/** */
export type GeneratorData<R, Props> = R | Callback<Props, R>;

/** */
export interface JsonData {
  [key: string]: any;
}
