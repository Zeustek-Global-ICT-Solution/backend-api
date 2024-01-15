import { Module } from '@nestjs/common';
import { OpenAIService } from './services/openai.service';
import { OpenAIProviders } from './providers/openai.provider';

@Module({
  providers: [OpenAIService, ...OpenAIProviders],
  exports: [OpenAIService, ...OpenAIProviders],
})
export class OpenaiModule {}
