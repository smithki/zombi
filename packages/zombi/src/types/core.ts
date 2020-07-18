import { PromptOptionsType, PromptTypes, Unionize } from 'listr2';
import { Observable as RxObservable } from 'rxjs';
import { FileSystem, FSContext } from '../fs';
import { Zombi } from '../generator';
import { Nominal, RequiredOnly } from './utility';

/**
 * Object type emitted by a `Zombi` instance's underlying RxJS stream.
 */
export interface ZombiStreamOutput<Props> {
  context: FSContext<Props>;
  props: Props;
  prompts: SideEffect<Props>[];
  sequence: (SideEffect<Props> | SideEffect<Props>[])[];
}

/**
 * The RxJS observable stream underlying a `Zombi` instance.
 */
export interface ZombiStream<Props> extends RxObservable<ZombiStreamOutput<Props>> {}

/**
 * Options given to the `Zombi` constructor or passed via the standard
 * `zombi(...)` interface.
 */
export interface Configuration<Props> extends Partial<Pick<Zombi<Props>, 'name' | 'destinationRoot'>> {
  initialProps?: Props | Partial<Props>;
  /**
   * Whether to force overwrites on file conflicts.
   */
  clobber?: boolean;
  templateRoot?: string | boolean;
}

/**
 * The underlying operator function passed to `Zombi.sequence` or
 * `Zombi.parallelism`.
 */
export interface ZombiOperatorFunction<Props, Context = any> {
  (stream: ZombiStream<Props>, context?: Context): ZombiStream<Props>;
}

/**
 * A condition context provided to any operator function.
 */
export interface ConditionContext<Props> {
  condition: Resolveable<boolean, Props>;
}

/**
 * An operator which registers a side-effect into the `Zombi` instance.
 */
export interface ZombiSideEffectOperator<Props, Context = any>
  extends Nominal<ZombiOperatorFunction<Props, Context>, 'ZombiSideEffectOperator'> {}

/**
 * An operator which registers a prompt into the `Zombi` instance.
 */
export interface ZombiPromptOperator<Props, Context = any>
  extends Nominal<ZombiOperatorFunction<Props, Context>, 'ZombiPromptOperator'> {}

/**
 * Internal operator for handling parallelism.
 */
export interface ZombiParallelismOperator<Props, Context = any>
  extends Nominal<ZombiOperatorFunction<Props, Context>, 'ZombiParallelismOperator'> {}

/**
 * A `Zombi`-compatible operator.
 */
export type ZombiOperator<Props> =
  | ZombiSideEffectOperator<Props>
  | ZombiPromptOperator<Props>
  | ZombiParallelismOperator<Props>;

/**
 *
 */
export type SideEffectCallback<Props> = (
  generator: ZombiStreamOutput<Props>,
  utils: SideEffectUtils<Props>,
) => Promise<void>;

/**
 * A effectful callback with attached context.
 */
export type SideEffect<Props> = SideEffectCallback<Props> & SideEffectOperatorOptions<Props>;

/**
 * Options given to the core `sideEffect(...)` operator.
 */
export interface SideEffectOperatorOptions<Props> {
  /**
   * Whether to prepend this side-effect to the `Zombi` instance's list of
   * tasks.
   */
  enforcePre?: boolean;
  condition?: Resolveable<boolean, Props>;
}

/**
 * Utilities made available to a `SideEffect` callback.
 */
export interface SideEffectUtils<Props> {
  ask: <T = any>(questions: Question<Props> | Question<Props>[]) => Promise<T>;
  statusIO: NodeJS.WritableStream;
  fs: FileSystem<Props>;
}

/**
 * Object describing the shape of an `Enquirer` prompt.
 */
export type Question<Props> = Unionize<
  {
    [K in PromptTypes]-?: {
      type: K;
    } & PromptOptionsType<K> & {
        name: Extract<keyof RequiredOnly<Props>, string>;
      };
  }
>;

/**
 * Arbitrary data or a callback that resolves to arbitrary data.
 */
export type Resolveable<R, Props> = R | ((generator: ZombiStreamOutput<Props>) => R | Promise<R>);

/**
 * A placeholder type for arbitrary JSON data.
 */
export interface JsonData {
  [key: string]: any;
}
