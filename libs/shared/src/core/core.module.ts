/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 600,
        auth_pass: 'AbUcLDwFV3YQQtTrUzdAcGpePxfhPiOUcAzCaMZV3nk=',
        host: 'jummaiCacheStore.redis.cache.windows.net',
        port: 6380,
        tls: {
          host: 'jummaiCacheStore.redis.cache.windows.net',
        },
        store: (await redisStore({})) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
    // CacheModule.register({
    //   store: redisStore,
    //   port: 6380,
    //   auth_pass: 'AbUcLDwFV3YQQtTrUzdAcGpePxfhPiOUcAzCaMZV3nk=',
    //   host: 'jummaiCacheStore.redis.cache.windows.net',
    //   tls: {
    //     host: 'jummaiCacheStore.redis.cache.windows.net',
    //   },
    //   isGlobal: true,
    // }),
  ],
})
export class CoreModule {}
