import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('app.jwt_secret'),
          signOptions: { expiresIn: config.get('app.jwt_expiration') },
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.register({
      uri: process.env.REDIS_URL,
      store: redisStore,
      isGlobal: true,
    }),
  ],
})
export class CoreModule {}
