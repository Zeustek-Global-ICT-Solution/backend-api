import { Module } from '@nestjs/common';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Response, ResponseSchema } from '@app/shared/schemas';
import { ReponsesRepository } from './repository/response.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Response.name, schema: ResponseSchema },
    ]),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService, ReponsesRepository],
  exports: [ResponsesService, ReponsesRepository],
})
export class ResponsesModule {}
