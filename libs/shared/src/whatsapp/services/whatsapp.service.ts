/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WHATSAPP_TOKEN } from '@app/shared/constant';
import { Client } from 'whatsapp-web.js';

@Injectable()
export class WhatsappService implements OnModuleInit {
  constructor(
    @Inject(WHATSAPP_TOKEN) private readonly whatsappClient: Client,
    protected config: ConfigService,
  ) {}
  onModuleInit() {
    this.whatsappClient.on('authenticated', (session) => {
      console.log(session.WAToken1);
    });
  }
}
