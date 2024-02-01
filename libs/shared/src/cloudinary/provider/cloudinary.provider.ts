import { ConfigService } from '@nestjs/config';
import { CLOUDINARY_TOKEN } from '@app/shared/constant';
import { v2 } from 'cloudinary';

export const CloudinaryProviders = [
  {
    provide: CLOUDINARY_TOKEN,
    useFactory: async (config: ConfigService) => {
      const client = v2.config({
        cloud_name: config.get<string>('service.cloudinary.cloudName'),
        api_key: config.get<string>('service.cloudinary.apiKey'),
        api_secret: config.get<string>('service.cloudinary.apiSecret'),
      });
      return client;
    },
    inject: [ConfigService],
  },
];
