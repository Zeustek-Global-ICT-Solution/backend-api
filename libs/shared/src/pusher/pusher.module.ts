import { Module } from '@nestjs/common';
import { PusherProviders } from './providers/pusher.provider';
import { PusherService } from './services/pusher.service';

@Module({
  providers: [...PusherProviders, PusherService],
  exports: [...PusherProviders, PusherService],
})
export class PusherModule {}
