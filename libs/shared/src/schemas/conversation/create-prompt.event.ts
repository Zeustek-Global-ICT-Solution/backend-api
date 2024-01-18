/* eslint-disable @typescript-eslint/no-unused-vars */
export class CreatePromptEvent {
  conversation: string;
  content: string;
  type: string;
  user: string;
  constructor(
    conversation: string,
    content: string,
    type: string,
    user: string,
  ) {}
}
