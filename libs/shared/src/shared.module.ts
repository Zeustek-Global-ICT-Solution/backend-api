import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { OpenaiModule } from './openai/openai.module';
import { AzureFileUploadModule } from './azure-file-upload/azure-file-upload.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [CoreModule, DatabaseModule, OpenaiModule, AzureFileUploadModule],
})
export class SharedModule {}
