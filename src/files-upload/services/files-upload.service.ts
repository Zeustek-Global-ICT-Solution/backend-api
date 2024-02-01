import { BaseService } from '@app/shared/base/base.service';
import { CloudinaryService } from '@app/shared/cloudinary/service/cloudinary.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesUploadService extends BaseService {
  constructor(private service: CloudinaryService) {
    super();
  }
  public async uploadFile(file: Express.Multer.File): Promise<any> {
    const result = await this.service.uploadImage(file);
    const { public_id, url, secure_url, resource_type, format, width, height } =
      result;

    return { public_id, url, secure_url, resource_type, format, width, height };
  }
}
