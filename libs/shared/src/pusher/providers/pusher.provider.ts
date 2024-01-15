import { PUSHER_TOKEN } from '@app/shared/constant';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

export const PusherProviders = [
  {
    provide: PUSHER_TOKEN,
    useFactory: async (config: ConfigService) => {
      const pusher = new Pusher({
        appId: config.get<string>('service.pusher.appId'),
        key: config.get<string>('service.pusher.apiKey'),
        secret: config.get<string>('service.pusher.appSecret'),
        cluster: config.get<string>('service.pusher.cluster'),
        useTLS: true,
      });
      return pusher;
    },
    inject: [ConfigService],
  },
];
