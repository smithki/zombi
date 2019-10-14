// --- Imports -------------------------------------------------------------- //

// Node modules
import { Question as InquirerQuestion } from 'inquirer';
import { Observable as RxObservable } from 'rxjs';

// Local modules
import { FileSystem } from './fs';
import { Generator } from './generator';

// --- Utility types -------------------------------------------------------- //

type Nominal<K, T> = K & { __nominalBrand: T };

// --- Core types ----------------------------------------------------------- //

/**
 * Values provided to the stream picked from the executing `Generator` instance
 * (referring to the instance that invoked `Generator.run()`).
 */
export interface ExecutingGeneratorContext<Props>
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

/** Object type produced by a `Generator`'s underlying RxJS stream. */
export interface GeneratorOutput<Props> {
  context: ExecutingGeneratorContext<Props>;
  props: Props;
  prompts: SideEffect<Props>[];
  sequence: (SideEffect<Props> | SideEffect<Props>[])[];
  fs: FileSystem<Props>;
}

/**
 * Options given to the `Generator` constructor or passed via the standard
 * `zombi(...)` interface.
 */
export interface GeneratorConfig<Props>
  extends Partial<Pick<Generator<Props>, 'name' | 'destinationRoot'>> {
  initialProps?: Props | Partial<Props>;
  /** Whether to force overwrites on file conflicts. */
  force?: boolean;
  templateRoot?: string | boolean;
}

/** Options given to `FileSystem` methods that render _new_ files. */
export interface FSOptions {
  /** Whether to force overwrites on file conflicts. */
  force?: boolean;
  /** Whether to render a file with EJS data. */
  ejs?: boolean;
  /**
   * When copying directories with this option enabled, files living at the
   * supplied location will be deleted, even if they produce no conflicts.
   */
  replaceDirectories?: boolean;
}

/** */
export interface ZombiOperatorFunction<Props, Context = any> {
  (stream: GeneratorStream<Props>, context?: Context): GeneratorStream<Props>;
}

/** */
export interface ConditionContext<Props> {
  condition: GeneratorData<boolean, Props>;
}

/** The RxJS unary function that underlies a `Generator`'s observable pipe. */
export interface ZombiSideEffectOperator<Props, Context = any>
  extends Nominal<
    ZombiOperatorFunction<Props, Context>,
    'ZombiSideEffectOperator'
  > {}

/** The RxJS unary function that underlies a `Generator`'s observable pipe. */
export interface ZombiPromptOperator<Props, Context = any>
  extends Nominal<
    ZombiOperatorFunction<Props, Context>,
    'ZombiPromptOperator'
  > {}

/** The RxJS unary function that underlies a `Generator`'s observable pipe. */
export interface ZombiParallelismOperator<Props, Context = any>
  extends Nominal<
    ZombiOperatorFunction<Props, Context>,
    'ZombiParallelismOperator'
  > {}

/** The RxJS unary function that underlies a `Generator`'s observable pipe. */
export type ZombiOperator<Props> =
  | ZombiSideEffectOperator<Props>
  | ZombiPromptOperator<Props>
  | ZombiParallelismOperator<Props>;

/** Ecapsulates the concept of a "side-effect" as it relates to `Generator`. */
export type SideEffect<Props> = Callback<Props> &
  SideEffectOperatorOptions<Props>;

/** Options given to the core `sideEffect` operator. */
export interface SideEffectOperatorOptions<Props> {
  /** Whether to execute this operator at during the "prompting" phase of a `Generator`'s lifecyle. */
  enforcePre?: boolean;
  condition?: GeneratorData<boolean, Props>;
}

/**
 * A function which executes during the "side-effect" phase of the
 * `Generator` lifecycle.
 */
export interface Callback<Props, R = void> {
  (generator: GeneratorOutput<Props>): Promise<R>;
}

/** The RxJS observable underlying a `Generator`. */
export interface GeneratorStream<Props>
  extends RxObservable<GeneratorOutput<Props>> {}

/** Object describing the shape of an `Inquirer` prompt. */
export interface Question<Props> extends InquirerQuestion {
  name?: Extract<keyof Props, string>;
}

// --- Data types ----------------------------------------------------------- //

/**
 * Arbitrary data or a callback that resolves to arbitrary data.
 */
export type GeneratorData<R, Props> = R | Callback<Props, R>;

/** A placeholder type for arbitrary JSON data. */
export interface JsonData {
  [key: string]: any;
}
