import { ResponsesModule } from './../responses/responses.module';
import { PromptsModule } from './../prompts/prompts.module';
import { Module } from '@nestjs/common';
import { ConversationsService } from './services/conversations.service';
import { ConversationsController } from './controllers/conversations.controller';
import { OpenaiModule } from '@app/shared/openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from '@app/shared/schemas';
import { ConversationsRepository } from './repositories/converstion.repository';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryModule } from '@app/shared/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    OpenaiModule,
    PromptsModule,
    ResponsesModule,
    HttpModule,
    CloudinaryModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsRepository],
})
export class ConversationsModule {}
