export enum ZombiErrorCode {
  USER_CANCELED_PROMPT = 'USER_CANCELED_PROMPT',
}

export class ZombiError<Code extends ZombiErrorCode> extends Error {
  constructor(public readonly code: Code, message: string) {
    super(`[zombi ❯ ${code}] ${message}`);
  }
}

export const UserCanceledPromptError = new ZombiError(
  ZombiErrorCode.USER_CANCELED_PROMPT,
  'User canceled prompt. Nothing was rendered.',
);
