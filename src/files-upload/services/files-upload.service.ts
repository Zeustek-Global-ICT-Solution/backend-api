import { AzureFileUploadService } from '@app/shared/azure-file-upload/services/azure-file-upload.service';
import { BaseService } from '@app/shared/base/base.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesUploadService extends BaseService {
  constructor(private readonly service: AzureFileUploadService) {
    super();
  }
  public async uploadFile(file: Express.Multer.File): Promise<any> {
    return await this.service.uploadFile(file);
  }
  public async getFile(fileName: string): Promise<any> {
    return await this.service.getFile(fileName);
  }
}
