import { Module } from '@nestjs/common';
// import { redisStore } from 'cache-manager-redis-yet';
// import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    // CacheModule.register({
    //   url: process.env.REDIS_URL,
    //   store: redisStore,
    //   isGlobal: true,
    // }),
  ],
})
export class CoreModule {}
