import { Module } from '@nestjs/common';
import { AssistantsService } from './services/ssistants.service';
import { AssistantsController } from './controllers/assistants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assistant, AssistantSchema } from '@app/shared/schemas';
import { AssistantsRepository } from './repository/assistant.repository';
import { UsersModule } from 'src/users/users.module';
import { OpenaiModule } from '@app/shared/openai/openai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assistant.name, schema: AssistantSchema },
    ]),
    UsersModule,
    OpenaiModule,
  ],
  controllers: [AssistantsController],
  providers: [AssistantsService, AssistantsRepository],
})
export class AssistantsModule {}
