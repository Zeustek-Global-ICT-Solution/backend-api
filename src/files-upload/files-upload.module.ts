import { Module } from '@nestjs/common';
import { FilesUploadService } from './services/files-upload.service';
import { FilesUploadController } from './controllers/files-upload.controller';
import { AzureFileUploadModule } from '@app/shared/azure-file-upload/azure-file-upload.module';

@Module({
  imports: [AzureFileUploadModule],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {}
