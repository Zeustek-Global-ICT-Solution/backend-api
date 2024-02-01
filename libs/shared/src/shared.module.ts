import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { OpenaiModule } from './openai/openai.module';
import { AzureFileUploadModule } from './azure-file-upload/azure-file-upload.module';
import { AppAssistantEventModule } from './app-assistant-event/app-assistant-event.module';
import { PusherModule } from './pusher/pusher.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { AppBullModule } from './app-bull/app-bull.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [
    CoreModule,
    DatabaseModule,
    OpenaiModule,
    AzureFileUploadModule,
    AppAssistantEventModule,
    PusherModule,
    WhatsappModule,
    AppBullModule,
    CloudinaryModule,
  ],
})
export class SharedModule {}
