import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AssistantsModule } from './assistants/assistants.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@app/shared';
import { DatabaseModule } from '@app/shared/database/database.module';
import { CoreModule } from '@app/shared/core/core.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { ResponsesModule } from './responses/responses.module';
import { PromptsModule } from './prompts/prompts.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    AssistantsModule,
    ConversationsModule,
    TerminusModule,
    DatabaseModule,
    CoreModule,
    FilesUploadModule,
    ResponsesModule,
    PromptsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
