import { AzureFileUploadService } from '@app/shared/azure-file-upload/services/azure-file-upload.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly azureFileUploadService: AzureFileUploadService,
  ) {}
  public async uploadFile(file: Express.Multer.File): Promise<any> {
    console.log(file);

    return await this.azureFileUploadService.uploadFile(file);
  }
}
