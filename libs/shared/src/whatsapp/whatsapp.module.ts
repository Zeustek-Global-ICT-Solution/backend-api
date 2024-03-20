import { Module } from '@nestjs/common';
import { WhatsappProviders } from './providers/whatsapp.provider';
import { WhatsappService } from './services/whatsapp.service';

@Module({
  providers: [...WhatsappProviders, WhatsappService],
  exports: [...WhatsappProviders, WhatsappService],
})
export class WhatsappModule {}
