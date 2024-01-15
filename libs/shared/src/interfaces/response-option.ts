/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, QueryParser } from '../common';

export interface ResponseOption {
  value?: any | Document;
  code: number;
  model?: any;
  queryParser?: QueryParser;
  pagination?: Pagination;
  hiddenFields?: string[];
  message?: string;
  count?: number;
  token?: string;
  is2FAEnabled?: boolean;
  type2FA?: 'sms' | 'email' | 'device';
  filterQuery?: Record<any, unknown>;
  email?: any;
}
