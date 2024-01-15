import { Module } from '@nestjs/common';
import { AzureFileUploadProviders } from './providers/azure-file-upload.provider';
import { AzureFileUploadService } from './services/azure-file-upload.service';

@Module({
  providers: [AzureFileUploadService, ...AzureFileUploadProviders],
  exports: [AzureFileUploadService, ...AzureFileUploadProviders],
})
export class AzureFileUploadModule {}
