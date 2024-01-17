import { Module } from '@nestjs/common';
import { AssistantsService } from './services/ssistants.service';
import { AssistantsController } from './controllers/assistants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assistant, AssistantSchema } from '@app/shared/schemas';
import { AssistantsRepository } from './repository/assistant.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assistant.name, schema: AssistantSchema },
    ]),
  ],
  controllers: [AssistantsController],
  providers: [AssistantsService, AssistantsRepository],
})
export class AssistantsModule {}
