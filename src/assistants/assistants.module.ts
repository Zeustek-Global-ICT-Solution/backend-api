import { Module } from '@nestjs/common';
import { AssistantsService } from './services/ssistants.service';
import { AssistantsController } from './controllers/assistants.controller';

@Module({
  controllers: [AssistantsController],
  providers: [AssistantsService],
})
export class AssistantsModule {}
