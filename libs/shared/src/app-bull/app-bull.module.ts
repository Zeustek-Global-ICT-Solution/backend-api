/* eslint-disable @typescript-eslint/no-unused-vars */
import { Global, Module } from '@nestjs/common';
import { MessageProcessor } from './processors/email.processor';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommunicationService } from '../communication/services/communication.service';
import { CommunicationModule } from '../communication/communication.module';

@Global()
@Module({
  imports: [
    CommunicationModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'message_queue', // Replace with your queue name
      defaultJobOptions: {
        attempts: 10, // Number of retries (default is 1)
        backoff: {
          type: 'fixed', // You can also use 'exponential' or a custom backoff function
          delay: 5000, // Delay between retries in milliseconds (default is 0)
        },
      },
    }),
  ],
  providers: [MessageProcessor],
  exports: [MessageProcessor],
})
export class AppBullModule {}
