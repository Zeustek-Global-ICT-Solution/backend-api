/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigService } from '@nestjs/config';
import { OPENAI_TOKEN } from '../../constant';
import OpenAI from 'openai';

export const OpenAIProviders = [
  {
    provide: OPENAI_TOKEN,
    useFactory: async (config: ConfigService) => {
      const openai = new OpenAI();
      return openai;
    },
    inject: [ConfigService],
  },
];
