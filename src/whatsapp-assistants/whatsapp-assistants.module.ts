import { Module } from '@nestjs/common';
import { WhatsappAssistantsService } from './services/whatsapp-assistants.service';
import { WhatsappAssistantsController } from './controllers/whatsapp-assistants.controller';

@Module({
  controllers: [WhatsappAssistantsController],
  providers: [WhatsappAssistantsService],
})
export class WhatsappAssistantsModule {}
