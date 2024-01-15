/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEmailName {
  email: string;
  name?: string;
  fromEmail?: string;
}

export interface MailOption {
  emailName: IEmailName;
  fromEmail?: IEmailName;
  subject?: string;
  template?: string;
  templateId?: any;
  content?: any;
}
export interface ICalculateAverageDailySavings {
  institutionId: number;
}

export interface SMSOption {
  to: string;
  from: string;
  token: string;
}
