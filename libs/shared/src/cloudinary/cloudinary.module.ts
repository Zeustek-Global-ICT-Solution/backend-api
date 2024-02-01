import { Module } from '@nestjs/common';
import { CloudinaryService } from './service/cloudinary.service';
import { CloudinaryProviders } from './provider/cloudinary.provider';

@Module({
  providers: [CloudinaryService, ...CloudinaryProviders],
  exports: [CloudinaryService, ...CloudinaryProviders],
})
export class CloudinaryModule {}
