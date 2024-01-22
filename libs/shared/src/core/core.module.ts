/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppBullModule } from '../app-bull/app-bull.module';

@Module({
  imports: [
    AppBullModule,
    CacheModule.register({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class CoreModule {}
