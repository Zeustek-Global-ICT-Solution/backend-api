import { Module } from '@nestjs/common';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';

@Module({
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
