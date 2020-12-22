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
  /**
   * Initial props given to the Zombi instance.
   */
  initialProps?: Props | Partial<Props>;

  /**
   * Whether to force overwrites on file conflicts.
   */
  clobber?: boolean;

  /**
   * The root directory where the generator can resolve template files. Relative
   * paths for most effectful operators are considered relative to the value
   * given here. If no `templateRoot` is specified, the closest `template`
   * directory to the Zombi instance being executed is used. If templates are
   * not required, set this to `false`.
   */
  templateRoot?: string | boolean;
}

/**
 * The underlying operator function passed to `Zombi.sequence` or
 * `Zombi.parallelism`.
 */
interface OperatorFunction<Props, Context = any> {
  (stream: ZombiStream<Props>, context?: Context): ZombiStream<Props>;
}

/**
 * An operator which registers a side-effect into the `Zombi` instance.
 */
export interface SideEffectOperator<Props, Context extends SideEffectContext<any> = SideEffectContext<Props>>
  extends Nominal<OperatorFunction<Props, Context>, 'SideEffectOperator'> {}

/**
 * An operator which registers a prompt into the `Zombi` instance.
 */
export interface PromptOperator<Props, Context = any>
  extends Nominal<OperatorFunction<Props, Context>, 'PromptOperator'> {}

/**
 * Internal operator for handling parallelism.
 * @internal
 */
export interface ParallelismOperator<Props, Context = any>
  extends Nominal<OperatorFunction<Props, Context>, 'ParallelismOperator'> {}

/**
 * A `Zombi`-compatible operator.
 */
export type Operator<Props> = SideEffectOperator<Props> | PromptOperator<Props> | ParallelismOperator<Props>;

/**
 * Utilities made available to a `SideEffect` callback.
 */
export interface SideEffectUtils<Props> {
  ask: <T = any>(questions: Question<Props> | Question<Props>[]) => Promise<T>;
  statusIO: NodeJS.WritableStream;
  fs: FileSystem<Props>;
}

/**
 * A effectful callback.
 */
export type SideEffectCallback<Props> = (
  generator: ZombiStreamOutput<Props>,
  utils: SideEffectUtils<Props>,
) => void | Promise<void>;

/**
 * Options given to the core `sideEffect(...)` operator.
 */
export interface SideEffectContext<Props> {
  /**
   * Whether to prepend this side-effect to the `Zombi` instance's list of
   * tasks.
   */
  enforcePre?: boolean;

  /**
   * Whether to execute this side-effect.
   */
  condition?: Resolveable<boolean, Props>;
}

/**
 * A effectful callback with attached context.
 */
export type SideEffect<Props> = SideEffectCallback<Props> & SideEffectContext<Props>;

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
 * From the generator type given by `T`, infer the typing of its props.
 */
export type GeneratorProps<T extends Zombi<any>> = T extends Zombi<infer R> ? R : never;

/**
 * A placeholder type for arbitrary JSON data.
 */
export interface JsonData {
  [key: string]: any;
}
