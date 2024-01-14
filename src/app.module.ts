import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WhatsappAssistantsModule } from './whatsapp-assistants/whatsapp-assistants.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@app/shared';
import { DatabaseModule } from '@app/shared/database/database.module';
import { CoreModule } from '@app/shared/core/core.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    WhatsappAssistantsModule,
    ConversationsModule,
    TerminusModule,
    DatabaseModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
