import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class CoreModule {}
