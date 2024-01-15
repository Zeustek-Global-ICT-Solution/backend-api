import { PUSHER_TOKEN } from '@app/shared/constant';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  constructor(
    @Inject(PUSHER_TOKEN) private readonly pusherClient: Pusher,
    protected config: ConfigService,
  ) {}

  public async sendPusherEvent(payload: any) {
    try {
      const response = await this.pusherClient.trigger(
        payload.channel,
        payload.event,
        payload.data,
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}
