import { Inject, Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { AZURE_FILE_UPLOAD_TOKEN } from '@app/shared/constant';
import { AppException } from '@app/shared/exceptions';

@Injectable()
export class AzureFileUploadService {
  private containerName: string;
  constructor(
    @Inject(AZURE_FILE_UPLOAD_TOKEN)
    private readonly blobServiceClient: BlobServiceClient,
    protected config: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    try {
      this.containerName = this.config.get<string>(
        'service.azure.containerName',
      );
      const extension = file.originalname.split('.').pop();
      const file_name = uuid() + '.' + extension;
      const blockBlobClient = await this.getBlobClient(file_name);
      const fileUrl = blockBlobClient.url;
      await blockBlobClient.uploadData(file.buffer);

      return fileUrl;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = this.blobServiceClient;
    const containerName = this.containerName;
    const containerClient = blobService.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);

    return blockBlobClient;
  }
}
