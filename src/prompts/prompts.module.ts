import { Module } from '@nestjs/common';
import { PromptsService } from './services/prompts.service';
import { PromptsController } from './controllers/prompts.controller';

@Module({
  controllers: [PromptsController],
  providers: [PromptsService],
})
export class PromptsModule {}
