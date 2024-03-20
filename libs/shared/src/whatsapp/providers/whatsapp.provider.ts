/* eslint-disable @typescript-eslint/no-unused-vars */
import { WHATSAPP_TOKEN } from '@app/shared/constant';
import { ConfigService } from '@nestjs/config';
import { Client, NoAuth } from 'whatsapp-web.js';

export const WhatsappProviders = [
  {
    provide: WHATSAPP_TOKEN,
    useFactory: async (config: ConfigService) => {
      const client = new Client({
        puppeteer: {
          headless: false,
        },
        authStrategy: new NoAuth(),
      });

      return client;
    },
    inject: [ConfigService],
  },
];
