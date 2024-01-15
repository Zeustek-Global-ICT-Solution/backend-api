import { AZURE_FILE_UPLOAD_TOKEN } from '@app/shared/constant';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';

export const AzureFileUploadProviders = [
  {
    provide: AZURE_FILE_UPLOAD_TOKEN,
    useFactory: async (config: ConfigService) => {
      const blobClientService = await BlobServiceClient.fromConnectionString(
        config.get<string>('service.azure.fileUploadConnectionString'),
      );
      return blobClientService;
    },
    inject: [ConfigService],
  },
];
