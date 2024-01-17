import { Module } from '@nestjs/common';
import { PromptsService } from './services/prompts.service';
import { PromptsController } from './controllers/prompts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prompt, PromptSchema } from '@app/shared/schemas';
import { PromptsRepository } from './repository/prompt.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prompt.name, schema: PromptSchema }]),
  ],
  controllers: [PromptsController],
  providers: [PromptsService, PromptsRepository],
})
export class PromptsModule {}
