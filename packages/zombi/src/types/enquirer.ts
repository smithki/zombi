/* eslint-disable */

/**
 * These are more-or-less complete typings for the `enquirer` module, copied
 * (almost) wholesale from this PR: https://github.com/enquirer/enquirer/pull/307
 *
 * For posterity: `enquirer` is MIT licensed, you can view its license in full
 * at the root of the source tree in the linked PR above.
 *
 * -----
 *
 * A few adjustments were made to ensure the typings are in good, working order:
 *
 *  - `Enquirer` class/namespace is renamed to `EnquirerWrapper`
 *
 *  - `EnquirerWrapper.types.QuestionBase` no longer extends from
 *    `EnquirerWrapper.Prompt.Question`
 *
 *  - `EnquirerWrapper.Prompt.prompt` argument is changed to union of
 *    `EnquirerWrapper.Prompt.Question` and `EnquirerWrapper.prompt.Question`
 *
 *  - Removed superfluous reference to non-existent `Type` in
 *    `AutoCompleteQuestion` subtypes. This was causing all question objects to
 *    be interpreted as `any`.
 *
 *  - Removed the dependency on `SymbolType` from `ansi-colors` because some of
 *    the referenced fields are missing. All of the symbols are generic `string`
 *    types anyways and I don't see the value in maintaining those as literal
 *    types.
 *
 * -----
 *
 * I am by no means an expert with `enquirer`, so I'm hoping for the best with
 * these changes 🤞
 *
 * I look forward to the day where at least one of the many, many nearly
 * identical NodeJS prompt libraries has completely correct, built-in typings. I
 * think `enquirer` has the best shot yet with this definition file as a start.
 *
 * Good luck everybody!
 */

import { EventEmitter } from 'events';

declare class EnquirerWrapper extends EventEmitter {
  constructor(options?: any, answers?: EnquirerWrapper.Answers);

  /**
   * Register a custom prompt type.
   *
   * @param type
   * @param fn `Prompt` class, or a function that returns a `Prompt` class.
   */
  register(
    type: string,
    fn: EnquirerWrapper.Constructor<EnquirerWrapper.Prompt<any>> | (() => EnquirerWrapper.Constructor<EnquirerWrapper.Prompt<any>>),
  ): this;

  /**
   * Register a custom prompt type.
   */
  register(
    type: Record<
      string,
      EnquirerWrapper.Constructor<EnquirerWrapper.Prompt<any>> | (() => EnquirerWrapper.Constructor<EnquirerWrapper.Prompt<any>>)
    >,
  ): this;

  /**
   * Prompt function that takes a "question" object or array of question
   * objects, and returns an object with responses from the user.
   *
   * @param questions Options objects for one or more prompts to run.
   */
  prompt(question: EnquirerWrapper.prompt.Question): Promise<EnquirerWrapper.Answers>;
  prompt(questionFn: (this: EnquirerWrapper) => EnquirerWrapper.prompt.Question): Promise<EnquirerWrapper.Answers>;
  prompt(
    questions: Array<EnquirerWrapper.prompt.Question | ((this: EnquirerWrapper) => EnquirerWrapper.prompt.Question)>,
  ): Promise<EnquirerWrapper.Answers>;
  prompt(question: EnquirerWrapper.prompt.CustomQuestion): Promise<EnquirerWrapper.Answers>;
  prompt(questionFn: (this: EnquirerWrapper) => EnquirerWrapper.prompt.CustomQuestion): Promise<EnquirerWrapper.Answers>;
  prompt(
    questions: Array<EnquirerWrapper.prompt.CustomQuestion | ((this: EnquirerWrapper) => EnquirerWrapper.prompt.CustomQuestion)>,
  ): Promise<EnquirerWrapper.Answers>;

  /**
   * Use an enquirer plugin.
   *
   * @param plugin Plugin function that takes an instance of Enquirer.
   */
  use(plugin: (this: this, enquirer: this) => void): this;
}

declare namespace EnquirerWrapper {
  export type Constructor<T extends Prompt> = new (...args: ConstructorParameters<new (...args: any) => T>) => T;

  export function prompt(question: prompt.Question): Promise<Answers>;
  export function prompt(questionFn: (this: EnquirerWrapper) => prompt.Question): Promise<Answers>;
  export function prompt(questions: Array<prompt.Question | ((this: EnquirerWrapper) => prompt.Question)>): Promise<Answers>;
  export function prompt(question: prompt.CustomQuestion): Promise<Answers>;
  export function prompt(questionFn: (this: EnquirerWrapper) => prompt.CustomQuestion): Promise<Answers>;
  export function prompt(
    questions: Array<prompt.CustomQuestion | ((this: EnquirerWrapper) => prompt.CustomQuestion)>,
  ): Promise<Answers>;

  export namespace prompt {
    export function on(type: types.PromptType, handler: (p: Prompt<any>) => void): void;

    export type Question =
      | AutoCompleteQuestion
      | BasicAuthQuestion
      | ConfirmQuestion
      | EditableQuestion
      | FormQuestion
      | InputQuestion
      | InvisibleQuestion
      | ListQuestion
      | MultiSelectQuestion
      | NumeralQuestion
      | PasswordQuestion
      | QuizQuestion
      | ScaleQuestion
      | SelectQuestion
      | SnippetQuestion
      | SortQuestion
      | SurveyQuestion
      | TextQuestion
      | ToggleQuestion;

    export type AutoCompleteQuestion = AutoCompleteQuestion.Single | AutoCompleteQuestion.Multiple;
    export type BasicAuthQuestion = {
      type: 'basicauth';
    } & BasicAuthQuestionOptions;
    export type ConfirmQuestion = { type: 'confirm' } & ConfirmQuestionOptions;
    export type EditableQuestion = {
      type: 'editable';
    } & EditableQuestionOptions;
    export type FormQuestion = { type: 'form' } & FormQuestionOptions;
    export type InputQuestion = { type: 'input' } & InputQuestionOptions;
    export type InvisibleQuestion = {
      type: 'invisible';
    } & InvisibleQuestionOptions;
    export type ListQuestion = { type: 'list' } & ListQuestionOptions;
    export type MultiSelectQuestionOptions = MultiSelectQuestion;
    export type NumeralQuestion = { type: 'numeral' } & NumeralQuestionOptions;
    export type PasswordQuestion = {
      type: 'password';
    } & PasswordQuestionOptions;
    export type QuizQuestion = { type: 'quiz' } & QuizQuestionOptions;
    export type ScaleQuestion = { type: 'scale' } & ScaleQuestionOptions;
    export type SelectQuestion = { type: 'select' } & SelectQuestionOptions;
    export type SnippetQuestion = { type: 'snippet' } & SnippetQuestionOptions;
    export type SortQuestion = { type: 'sort' } & SortQuestionOptions;
    export type SurveyQuestion = { type: 'survey' } & ScaleQuestionOptions;
    export type TextQuestion = { type: 'text' } & TextQuestionOptions;
    export type ToggleQuestion = { type: 'toggle' } & ToggleQuestionOptions;

    export type CustomQuestion<V extends types.Value = any, A extends types.Answer = any> = {
      type: string;
    } & internalTypes.CommonQuestion<V, A>;

    export namespace AutoCompleteQuestion {
      export type Options = {
        type?: 'autocomplete';
        choices: SelectQuestion.Choice[];
        suggest?: (
          input: string,
          choices: SelectQuestion.ChoiceOptions[],
        ) => SelectQuestion.ChoiceOptions[] | Promise<SelectQuestion.ChoiceOptions[]>;
      } & types.QuestionBase;

      export type SingleOptions = { multiple?: false } &
        Options &
        types.Initializer<string | number, string> &
        types.Formatter<string, string>;
      export type MultipleOptions = { multiple: true } &
        Options &
        types.Initializer<string | number, string[]> &
        types.Formatter<string, string[]>;
      export type Single = { type: 'autocomplete' } & SingleOptions;
      export type Multiple = { type: 'autocomplete' } & MultipleOptions;
    }

    export type BasicAuthQuestionOptions = {
      type?: 'basicauth';
      username: string;
      password: string;
      showPassword?: boolean;
    } & types.QuestionBase &
      types.Formatter<boolean, boolean> &
      types.Validator<boolean, boolean> &
      types.ResultTransformer<boolean, boolean>;

    export type ConfirmQuestionOptions = {
      type?: 'confirm';
    } & internalTypes.CommonQuestion<boolean | string, boolean>;

    export type EditableQuestionOptions = {
      type?: 'editable';
    } & SelectQuestionOptionsBase;

    export type FormQuestionOptions = {
      type?: 'form';
      choices: FormQuestion.Choice[];
      align?: 'left' | 'right';
    } & types.QuestionBase &
      types.Validator<FormQuestion.Answer, FormQuestion.Answer> &
      types.ResultTransformer<FormQuestion.Answer, FormQuestion.Answer>;

    export namespace FormQuestion {
      export type Choice = ChoiceOptions | Promise<ChoiceOptions> | (() => ChoiceOptions | Promise<ChoiceOptions>);
      export type ChoiceOptions = {
        name: string;
        value?: string;
        message: string;
        hint?: string;
        initial?: string;
        disabled?: boolean;
      };
      export type Answer = Record<string, string>;
    }

    export type InputQuestionOptions = {
      type?: 'input';
    } & internalTypes.CommonQuestion<string, string>;

    export type InvisibleQuestionOptions = {
      type?: 'invisible';
    } & internalTypes.CommonQuestion<string, string>;

    export type ListQuestionOptions = {
      type?: 'list';
      separator?: string;
    } & types.QuestionBase &
      types.Initializer<string | string[], string[]> &
      types.Formatter<string, string[]> &
      types.Validator<string[], string[]> &
      types.ResultTransformer<string[], string[]>;

    export type MultiSelectQuestion = {
      type?: 'multiselect';
      hint?: string;
      choices: SelectQuestion.Choice[];
      limit?: number;
      maxSelected?: number;
    } & types.QuestionBase &
      types.Initializer<string | string[], string[]> &
      types.Validator<string[], string[]> &
      types.Formatter<string[], string[]>;

    export type NumeralQuestionOptions = {
      type?: 'numeral';
    } & internalTypes.CommonQuestion<number, number>;

    export type PasswordQuestionOptions = {
      type?: 'password';
    } & internalTypes.CommonQuestion<string, string>;

    export type QuizQuestionOptions = {
      type?: 'quiz';
      choices: QuizQuestion.Choice[];
      correctChoice: number;
    } & types.QuestionBase &
      types.Initializer<number, QuizQuestion.Answer> &
      types.Formatter<boolean, QuizQuestion.Answer>;

    export namespace QuizQuestion {
      export type Choice =
        | string
        | Promise<string>
        | ChoiceOptions
        | (() => string | ChoiceOptions | Promise<string | ChoiceOptions>);
      export type ChoiceOptions = {
        name: string;
        value?: string;
        message?: string;
        hint?: string;
        role?: string;
        enabled?: boolean;
        disabled?: boolean | string;
      };
      export type Answer = {
        selectedAnswer: string;
        correctAnswer: string;
        correct: boolean;
      };
    }

    export type ScaleQuestionOptions = {
      type?: 'scale';
    } & ScaleQuestionOptionsBase;
    export type ScaleQuestionOptionsBase = {
      scale: { name: string; message: string }[];
      choices: ScaleQuestion.Choice[];
      align?: 'left' | 'right';
      edgeLength?: number;
      linebreak?: boolean;
      margin?: number | [number, number, number, number];
      messageWidth?: number;
      newline?: string;
      startNumber?: number;
    } & types.QuestionBase &
      types.Formatter<ScaleQuestion.Answer, ScaleQuestion.Answer> &
      types.ResultTransformer<ScaleQuestion.Answer, ScaleQuestion.Answer>;

    export namespace ScaleQuestion {
      export type Choice = ChoiceOptions | Promise<ChoiceOptions> | (() => ChoiceOptions | Promise<ChoiceOptions>);
      export type ChoiceOptions = {
        name: string;
        message: string;
        disabled?: boolean;
        initial?: number;
      };
      export type Answer = Record<string, number>;
    }

    export type SelectQuestionOptions = {
      type?: 'select';
    } & SelectQuestionOptionsBase;
    export type SelectQuestionOptionsBase = {
      choices: SelectQuestion.Choice[];
    } & types.QuestionBase &
      types.Initializer<string | number, string> &
      types.Formatter<string, string>;

    export namespace SelectQuestion {
      export type Choice =
        | string
        | Promise<string>
        | ChoiceOptions
        | (() => string | ChoiceOptions | Promise<string | ChoiceOptions>);
      export type ChoiceOptions = {
        /**
         * Disable a choice so that it cannot be selected. This value may either be `true`, `false`, or a message to display.
         */
        disabled?: boolean | string;
        /**
         * Help message to display next to a choice.
         */
        hint?: string;
        /**
         * Value to associate with the choice. Useful for creating key-value pairs from user choices. `name` is used when this is undefined.
         */
        message?: string;
        /**
         * The unique key to identify a choice.
         */
        name?: string;
        /**
         * Determines how the choice will be displayed. Currently the only role supported is `separator`. Additional roles may be added in the future (like heading, etc).
         */
        role?: 'separator';
        /**
         * The message to display in the terminal. `name` is used when this is undefined.
         */
        value?: string;
      };
    }

    export type SnippetQuestionOptions = {
      type?: 'snippet';
      required?: boolean;
      fields?: SnippetQuestion.Field[];
    } & types.QuestionBase &
      types.Formatter<SnippetQuestion.Answer, SnippetQuestion.Answer> &
      types.Validator<SnippetQuestion.Answer, SnippetQuestion.Answer>;

    export namespace SnippetQuestion {
      export type Field = {
        name: string;
        message?: string;
        initial?: string;
        validate?: (value: string) => boolean | Promise<boolean>;
      };

      export type Answer = {
        values: Record<string, string>;
        result: string;
      };
    }

    export type SortQuestionOptions = {
      type?: 'sort';
      choices: SortQuestion.Choice[];
      hint?: string;
      margin?: number | [number, number, number, number];
      numbered?: boolean;
    } & types.QuestionBase &
      types.Initializer<number, string[]> &
      types.Formatter<string[], string[]>;

    export namespace SortQuestion {
      export type Choice = ChoiceOptions | Promise<ChoiceOptions> | (() => ChoiceOptions | Promise<ChoiceOptions>);

      export type ChoiceOptions = {
        name: string;
        message: string;
      };
    }

    export type SurveyQuestionOptions = {
      type?: 'survey';
    } & ScaleQuestionOptionsBase;

    export type TextQuestionOptions = {
      type?: 'text';
    } & internalTypes.CommonQuestion<string, string>;

    export type ToggleQuestionOptions = {
      type?: 'toggle';
      enabled?: string;
      disabled?: string;
    } & internalTypes.CommonQuestion<boolean, boolean>;
  }

  export namespace types {
    export type Value =
      | string
      | boolean
      | number
      | string[]
      | prompt.ScaleQuestion.Answer
      | prompt.SnippetQuestion.Answer
      | prompt.FormQuestion.Answer;

    export type Answer =
      | string
      | boolean
      | number
      | string[]
      | prompt.QuizQuestion.Answer
      | prompt.ScaleQuestion.Answer
      | prompt.SnippetQuestion.Answer
      | prompt.FormQuestion.Answer;

    export type QuestionBase = {
      /**
       * Used as the key for the answer on the returned values (answers) object.
       */
      name?: string;
      /**
       * The message to display when the prompt is rendered in the terminal.
       */
      message?: string | (() => string | Promise<string>);
      /**
       * If `true` it will not ask that prompt.
       */
      skip?: boolean | ((state: any) => boolean | Promise<boolean>);
      show?: boolean;
      onSubmit?: (name: string, value: string, prompt: Prompt) => boolean | Promise<boolean>;
      onCancel?: (name: string, value: string, prompt: Prompt) => boolean | Promise<boolean>;
    };

    export type Initializer<V extends types.Value, A extends types.Answer> = {
      /**
       * The default value to return if the user does not supply a value.
       */
      initial?: V | ((this: Prompt<A>) => V | Promise<V>);
    };

    export type Formatter<V extends types.Value, A extends types.Answer> = {
      /**
       * Function to format user input in the terminal.
       */
      format?: (this: Prompt<A>, value: V | undefined) => string | Promise<string>;
    };

    export type Validator<V extends types.Value, A extends types.Answer> = {
      /**
       * Function to validate the submitted value before it's returned. This function may return a boolean or a string. If a string is returned it will be used as the validation error message.
       */
      validate?: (this: Prompt<A>, value: V) => boolean | string | Promise<boolean | string>;
    };

    export type ResultTransformer<V extends types.Value, A extends types.Answer> = {
      /**
       * Function to format the final submitted value before it's returned.
       */
      result?: (this: Prompt<A>, value: V) => A | Promise<A>;
    };

    export type Key = {
      name?: string;
      code?: string;
      sequence?: string;
      ctrl?: boolean;
      shift?: boolean;
      fn?: boolean;
    };

    export type ChoiceInput = string | Promise<string> | ChoiceOptions | (() => string | Promise<string>);

    export type ChoiceOptions = {
      name?: string;
      message?: string;
      hint?: string;
      role?: string;
      enabled?: boolean;
      disabled?: boolean;
      value?: types.Answer;
    };

    export type Choice = {
      name: string;
      message: string;
      hint?: string;
      disabled?: boolean;
      value?: types.Answer;
    };

    export type PromptType = string;

    export type Symbols = {
      // inherited symbols
      /**
       * `undefined` on windows, `✘` on other platforms.
       */
      ballotCross?: string;
      ballotDisabled: string;
      ballotOff: string;
      ballotOn: string;
      bullet: string;
      /**
       * `√` on windows, `✔` on other platforms.
       */
      check: string;
      /**
       * `×` on windows, `✖` on other platforms.
       */
      cross: string;
      /**
       * `...` on windows, `…` on other platforms.
       */
      ellipsis: string;
      heart: string;
      info: string;
      line: string;
      middot: string;
      /**
       * `>` on windows, `▸` on linux, and `❯` on other platforms.
       */
      pointer: string;
      /**
       * `»` on windows, `‣` on linux, and `›` on other platforms.
       */
      pointerSmall: string;
      question: string;
      /**
       * `undefined` on windows, `？` on other platforms.
       */
      questionFull?: string;
      /**
       * `?` on windows, `﹖` on other platforms.
       */
      questionSmall: string;
      /**
       * `( )` on windows, `◯` on other platforms.
       */
      radioOff: string;
      /**
       * `(*)` on windows, `◉` on other platforms.
       */
      radioOn: string;
      starsOff: string;
      starsOn: string;
      /**
       * `‼` on windows, `⚠` on other platforms.
       */
      warning: string;

      // symbols overridden by enquirer
      upDownDoubleArrow: string;
      upDownDoubleArrow2: string;
      upDownArrow: string;
      asterisk: string;
      asterism: string;
      bulletWhite: string;
      electricArrow: string;
      ellipsisLarge: string;
      ellipsisSmall: string;
      fullBlock: string;
      identicalTo: string;
      indicator: string;
      leftAngle: string;
      mark: string;
      minus: string;
      multiplication: string;
      obelus: string;
      percent: string;
      pilcrow: string;
      pilcrow2: string;
      pencilUpRight: string;
      pencilDownRight: string;
      pencilRight: string;
      plus: string;
      plusMinus: string;
      pointRight: string;
      rightAngle: string;
      section: string;
      hexagon: { off: string; on: string; disabled: string };
      ballot: { on: string; off: string; disabled: string };
      stars: { on: string; off: string; disabled: string };
      folder: { on: string; off: string; disabled: string };
      prefix: {
        pending: string;
        submitted: string;
        cancelled: string;
      };
      separator: {
        pending: string;
        submitted: string;
        cancelled: string;
      };
      radio: {
        /**
         * `( )` on windows, `◯` on other platforms.
         */
        off: string;
        /**
         * `(*)` on windows, `◉` on other platforms.
         */
        on: string;
        /**
         * `(|)` on windows, `Ⓘ` on other platforms.
         */
        disabled: string;
      };
      /**
       * Unicode circled numbers from `⓪` through `㊿`: `⓪`, `①`, `②`, `③`, etc.
       */
      numbers: string[];
    };

    export type Action = 'prev' | 'undo' | 'next' | 'redo' | 'save' | 'remove';
    export const BooleanPrompt: typeof EnquirerWrapper.BooleanPrompt;
    export type BooleanPrompt = EnquirerWrapper.BooleanPrompt;

    export const NumberPrompt: typeof EnquirerWrapper.NumberPrompt;
    export type NumberPrompt = EnquirerWrapper.NumberPrompt;

    export const StringPrompt: typeof EnquirerWrapper.StringPrompt;
    export type StringPrompt = EnquirerWrapper.StringPrompt;

    export const AuthPrompt: typeof EnquirerWrapper.AuthPrompt;
    export type AuthPrompt = EnquirerWrapper.AuthPrompt;

    export const ArrayPrompt: typeof EnquirerWrapper.ArrayPrompt;
    export type ArrayPrompt<T extends types.Answer> = EnquirerWrapper.ArrayPrompt<T>;
  }

  export namespace internalTypes {
    export type CommonQuestion<V extends types.Value, A extends types.Answer> = types.QuestionBase &
      types.Initializer<V, A> &
      types.Formatter<V, A> &
      types.Validator<V, A> &
      types.ResultTransformer<V, A>;
  }

  export type Answers = Record<string, types.Answer>;

  export class State {
    type: string;
    name: string;
    message: string;
    header: string;
    footer: string;
    error: string;
    hint: string;
    input: string;
    cursor: number;
    index: number;
    lines: number;
    tick: number;
    prompt: string;
    buffer: string;
    width: number;
    symbols: any;
    styles: any;
    required: typeof Set;
    cancelled: boolean;
    submitted: boolean;
    loading: boolean | 'choices';
    readonly status: 'pending' | 'cancelled' | 'submitted';
    _choices: types.Choice[];

    clone(): Omit<State, 'clone' | 'buffer'> & { buffer: Buffer };

    color: Function | any;
  }

  export class Prompt<T extends types.Answer = string> extends EventEmitter {
    name: string | undefined;
    type: string | undefined;
    options: Prompt.Question<T>;
    symbols: types.Symbols;
    styles: any;
    timers: any;
    state: State;
    initial?: T | (() => T | Promise<T>);

    readonly base: Prompt;
    readonly style: any;
    readonly height: number;
    readonly width: number;
    readonly size: number;
    cursor: number;
    input: string;
    value: T;

    constructor(options: Prompt.Question<T>);

    alert(): void;
    body(): null | string;
    cancel(err: any): void;
    clear(lines?: number): void;
    close(): void;
    cursorHide(): void;
    cursorShow(): void;
    element(name: string, choice: string[] | undefined, i: number): Promise<string>;
    error<E>(err: E): E | string;
    footer(): Promise<string>;
    format(value: T): string;
    header(): Promise<string>;
    hint(): Promise<string>;
    indicator(choice: string | undefined, i: number): Promise<string>;
    initialize(): void;
    isValue(value: any): boolean;
    keypress(input: string | number | null, modifiers?: types.Key): Promise<void>;
    message(): Promise<string>;
    pointer(choice: string[] | undefined, i: number): Promise<string> | string;
    prefix(): Promise<string>;
    render(): void;
    resolve(value: ((this: Prompt, ...args: any[]) => any) | any, ...args: any[]): any;
    restore(): void;
    result(value: T): string;
    run(): Promise<T>;
    sections(): {
      header: string;
      prompt: string;
      after: string;
      rest: string[];
      last: string;
    };
    separator(): Promise<string>;
    skip(): boolean;
    start(): void;
    submit(value?: any): Promise<void>;
    validate(value: T): boolean;
    write(string: string): void;
  }

  export namespace Prompt {
    export function prompt<T extends types.Answer = string>(): (options: Question<T> | prompt.Question) => Promise<any>;

    export type Question<T extends types.Answer = string, P extends Prompt<T> = Prompt<T>> = {
      default?: T;
      footer?: string | ((state: any) => string);
      format?: (this: P, value: T) => any;
      header?: string | ((state: any) => string);
      hint?: string;
      initial?: T | (() => Promise<T> | T);
      margin?: number | [number, number, number, number];
      message: string | (() => string | Promise<string>);
      name?: string | (() => string);
      onRun?: () => void;
      pointer?: (state: State, choice: types.Choice, i: number) => string;
      result?: (this: P, value: T) => any;
      skip?: boolean | ((this: P, name: string | undefined, value: string | undefined) => boolean | Promise<boolean>);
      show?: boolean;
      symbols?: Partial<types.Symbols>;
      timers?: Record<string, number | { interval?: number; frames: any[] }>;
      type?: string | (() => string);
      value?: T;
      validate?: (value: T) => boolean;
    };
  }

  export class ArrayPrompt<T extends types.Answer = string> extends Prompt {
    choices: types.Choice[];
    readonly enabled: types.Choice[];
    readonly focused: types.Choice | undefined;
    index: number;
    limit: number;
    readonly selectable: types.Choice[];
    readonly selected: types.Choice | types.Choice[];
    visible: types.Choice;

    constructor(question: ArrayPrompt.Question<T, ArrayPrompt>);

    a(): Promise<void>;
    addChoice(
      element:
        | string
        | ((this: ArrayPrompt<T>, arg: ArrayPrompt<T>) => Promise<types.Choice>)
        | Promise<types.Choice>
        | types.Choice,
      i: number,
      parent: types.Choice,
    ): Promise<types.Choice>;
    disable(choice: types.Choice): types.Choice;
    dispatch(ch?: string, key?: types.Key): void;
    down(): Promise<void>;
    enable(choice: types.Choice): types.Choice | undefined;
    end(): Promise<void>;
    filter(value: string | number | ((choice: types.Choice) => boolean)): types.Choice;
    filter<P extends keyof types.Choice>(
      value: string | number | ((choice: types.Choice) => boolean),
      prop: P,
    ): types.Choice[P];
    find(value: string | number | ((choice: types.Choice) => boolean)): types.Choice;
    find<P extends keyof types.Choice>(
      value: string | number | ((choice: types.Choice) => boolean),
      prop: P,
    ): types.Choice[P];
    findIndex(value: string | number | ((choice: types.Choice) => boolean)): number;
    first(): Promise<void>;
    focus(choice: types.Choice, enabled?: boolean): types.Choice;
    g(choice?: types.Choice): Promise<void>;
    home(): Promise<void>;
    i(): Promise<void>;
    indent(choice: types.Choice): string;
    initialize(): Promise<void>;
    isChoice(choice: types.Choice, value: string | number): boolean;
    isDisabled(choice?: types.Choice): boolean;
    isEnabled(choice?: types.Choice): boolean;
    isSelected(choice: types.Choice): boolean;
    last(): Promise<void>;
    left(): Promise<void>;
    map<P extends keyof types.Choice = 'value'>(names?: string[], prop?: P): Record<string, types.Choice[P]>;
    newItem(element: Partial<types.Choice>, i: number, parent: types.Choice): Promise<void>;
    next(): Promise<void>;
    number(n: string | number): Promise<number | undefined>;
    onChoice(choice: types.Choice, i: number): Promise<void>;
    pageDown(): Promise<void>;
    pageUp(): Promise<void>;
    prev(): Promise<void>;
    reset(): Promise<void>;
    right(): Promise<void>;
    scrollDown(i?: number): Promise<void>;
    scrollUp(i?: number): Promise<void>;
    shiftDown(): Promise<void>;
    shiftUp(): Promise<void>;
    space(): Promise<void>;
    submit(): Promise<void>;
    swap(pos: number): void;
    toChoice(
      element:
        | string
        | ((this: ArrayPrompt, arg: ArrayPrompt) => Promise<types.Choice>)
        | Promise<types.Choice>
        | types.Choice,
      i: number,
      parent?: types.Choice,
    ): Promise<types.Choice>;
    toChoices(value: any, parent?: any): Promise<types.Choice[]>;
    toggle(choice: types.Choice, enabled: boolean): types.Choice | undefined;
    up(): Promise<void>;
  }

  export namespace ArrayPrompt {
    export type Question<T extends types.Answer, P extends ArrayPrompt<T> = ArrayPrompt<T>> = Prompt.Question<
      string,
      P
    > & {
      choices:
        | (() => types.ChoiceInput[] | Promise<types.ChoiceInput[]>)
        | types.ChoiceInput[]
        | Promise<types.ChoiceInput[]>;
      initial?: string | number | Array<string | number> | Record<string, any>;
      autofocus?: number | string;
      multiple?: boolean;
    };
  }

  export class AuthPrompt extends Prompt<string> {}

  export class BooleanPrompt extends Prompt<boolean> {
    default: string;
    constructor(question: BooleanPrompt.Question);
    isTrue(input: boolean | string): boolean;
    isFalse(input: boolean | string): boolean;
  }

  export namespace BooleanPrompt {
    export type Question = Omit<Prompt.Question<boolean, BooleanPrompt>, 'initial' | 'default'> & {
      initial?: string | boolean | (() => string | boolean | Promise<string | boolean>);
      default?: string;
      isTrue?: (input: boolean | string) => boolean;
      isFalse?: (input: boolean | string) => boolean;
    };
  }

  export class NumberPrompt extends Prompt<number> {
    min: number;
    max: number;
    delay: number;
    float: boolean;
    round: boolean;
    major: number;
    minor: number;
    constructor(question: NumberPrompt.Question);
  }

  export namespace NumberPrompt {
    export type Question = Prompt.Question<number> & {
      min?: number;
      max?: number;
      delay?: number;
      float?: boolean;
      round?: boolean;
      major?: number;
      minor?: number;
    };
  }

  export class StringPrompt extends Prompt<string> {
    constructor(question: StringPrompt.Question);
    append(ch: string): void;
    backward(): void;
    cutForward(): void;
    cutLeft(): void;
    delete(): void;
    deleteForward(): void;
    dispatch(ch?: string, key?: types.Key): void;
    first(): void;
    forward(): void;
    format(value?: string): string;
    insert(str: string): void;
    last(): void;
    left(): void;
    moveCursor(n: number): void;
    next(): void;
    paste(): void;
    prev(): void;
    reset(): Promise<any>;
    right(): void;
    toggleCursor(): void;
  }

  export namespace StringPrompt {
    export type Question = Prompt.Question<string> & { multiline?: boolean };
  }

  export class AutoComplete<T extends types.Answer = string> extends Select {
    constructor(question: AutoComplete.Question<T>);
    complete(): Promise<void>;
    delete(): Promise<void>;
    deleteForward(): Promise<void>;
    space(ch?: string | undefined): Promise<void>;
    suggest(input?: string, choices?: types.Choice[]): types.Choice[];
  }
  export namespace AutoComplete {
    export type Question<T extends types.Answer, P extends AutoComplete = AutoComplete> = ArrayPrompt.Question<T, P> & {
      suggest?: (
        this: AutoComplete,
        input: string,
        choices: types.Choice[],
      ) => types.Choice[] | Promise<types.Choice[]>;
    };
  }
  export const autocomplete: AutoComplete;

  export class BasicAuth extends AuthPrompt {
    constructor(question: prompt.BasicAuthQuestionOptions);
  }
  export const basicauth: BasicAuth;

  export class Confirm extends BooleanPrompt {
    constructor(question: prompt.ConfirmQuestionOptions);
  }
  export const confirm: Confirm;

  export class Editable extends Select {
    constructor(question: prompt.EditableQuestionOptions);
  }
  export const editable: Editable;

  export class Form extends Select {
    constructor(question: prompt.FormQuestionOptions);
  }
  export const form: Form;

  export class Input extends StringPrompt {
    constructor(question: prompt.InputQuestionOptions);
    altDown(): Promise<void>;
    altUp(): Promise<void>;
    completion(action: types.Action): Promise<void>;
    prev(): void;
    save(): void;
    submit(): Promise<void>;
  }
  export const input: Input;

  export class Invisible extends StringPrompt {
    constructor(question: prompt.InvisibleQuestionOptions);
  }
  export const invisible: Invisible;

  export class List extends Prompt<string[]> {
    constructor(question: prompt.ListQuestionOptions);
    split(input?: string): string[];
    submit(): Promise<void>;
  }
  export const list: List;

  export class MultiSelect extends Select {
    constructor(question: prompt.MultiSelectQuestionOptions);
    readonly selected: types.Choice[];
  }
  export const multiselect: MultiSelect;

  export class Numeral extends NumberPrompt {
    constructor(question: prompt.NumeralQuestionOptions);
  }
  export const numeral: Numeral;

  export class Password extends StringPrompt {
    constructor(question: prompt.PasswordQuestionOptions);
  }
  export const password: Password;

  export class Quiz extends Select {
    constructor(question: prompt.QuizQuestionOptions);
  }
  export const quiz: Quiz;

  export class Scale extends ArrayPrompt {
    constructor(question: prompt.ScaleQuestionOptions);
  }
  export const scale: Scale;

  export class Select extends ArrayPrompt {
    constructor(question: prompt.SelectQuestionOptions);
    dispatch(ch?: string, key?: types.Key): Promise<void>;
    choiceMessage(choice: types.Choice, i: number): string;
    choiceSeparator(): string;
    renderChoice(choice: types.Choice, i: number): Promise<string>;
    renderChoices(): Promise<string>;
  }
  export const select: Select;

  export class Snippet extends Prompt {
    constructor(question: prompt.SnippetQuestionOptions);
  }
  export const snippet: Snippet;

  export class Sort extends Prompt {
    constructor(question: prompt.SortQuestionOptions);
  }
  export const sort: Sort;

  export class Survey extends ArrayPrompt {}
  export const survey: Survey;

  export const Text: typeof Input;
  export type Text = Input;
  export const text: Text;

  export class Toggle extends BooleanPrompt {
    constructor(question: prompt.ToggleQuestionOptions);
  }
  export const toggle: Toggle;

  export namespace prompts {
    export type AutoComplete = EnquirerWrapper.AutoComplete;
    export const AutoComplete: typeof EnquirerWrapper.AutoComplete;

    export type BasicAuth = EnquirerWrapper.BasicAuth;
    export const BasicAuth: typeof EnquirerWrapper.BasicAuth;

    export type Confirm = EnquirerWrapper.Confirm;
    export const Confirm: typeof EnquirerWrapper.Confirm;

    export type Editable = EnquirerWrapper.Editable;
    export const Editable: typeof EnquirerWrapper.Editable;

    export type Form = EnquirerWrapper.Form;
    export const Form: typeof EnquirerWrapper.Form;

    export type Input = EnquirerWrapper.Input;
    export const Input: typeof EnquirerWrapper.Input;

    export type Invisible = EnquirerWrapper.Invisible;
    export const Invisible: typeof EnquirerWrapper.Invisible;

    export type List = EnquirerWrapper.List;
    export const List: typeof EnquirerWrapper.List;

    export type MultiSelect = EnquirerWrapper.MultiSelect;
    export const MultiSelect: typeof EnquirerWrapper.MultiSelect;

    export type Numeral = EnquirerWrapper.Numeral;
    export const Numeral: typeof EnquirerWrapper.Numeral;

    export type Password = EnquirerWrapper.Password;
    export const Password: typeof EnquirerWrapper.Password;

    export type Quiz = EnquirerWrapper.Quiz;
    export const Quiz: typeof EnquirerWrapper.Quiz;

    export type Scale = EnquirerWrapper.Scale;
    export const Scale: typeof EnquirerWrapper.Scale;

    export type Select = EnquirerWrapper.Select;
    export const Select: typeof EnquirerWrapper.Select;

    export type Snippet = EnquirerWrapper.Snippet;
    export const Snippet: typeof EnquirerWrapper.Snippet;

    export type Sort = EnquirerWrapper.Sort;
    export const Sort: typeof EnquirerWrapper.Sort;

    export type Survey = EnquirerWrapper.Survey;
    export const Survey: typeof EnquirerWrapper.Survey;

    export type Text = EnquirerWrapper.Text;
    export const Text: typeof EnquirerWrapper.Text;

    export type Toggle = EnquirerWrapper.Toggle;
    export const Toggle: typeof EnquirerWrapper.Toggle;
  }
}

export = EnquirerWrapper;
