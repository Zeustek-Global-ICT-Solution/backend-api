import { Module } from '@nestjs/common';

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
  ],
})
export class CoreModule {}
