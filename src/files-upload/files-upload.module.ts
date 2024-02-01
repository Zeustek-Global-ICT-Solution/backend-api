import { Module } from '@nestjs/common';
import { FilesUploadService } from './services/files-upload.service';
import { FilesUploadController } from './controllers/files-upload.controller';
import { CloudinaryModule } from '@app/shared/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {}
