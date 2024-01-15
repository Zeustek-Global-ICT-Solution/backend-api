import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      port: 6379,
      auth_pass: 'AbUcLDwFV3YQQtTrUzdAcGpePxfhPiOUcAzCaMZV3nk=',
      host: 'jummaiCacheStore.redis.cache.windows.net',
      tls: {
        host: 'jummaiCacheStore.redis.cache.windows.net',
      },
      isGlobal: true,
    }),
  ],
})
export class CoreModule {}
