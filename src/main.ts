import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFilter } from '@app/shared';
// import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = process.env.PORT || 3000;
  app.enableCors();

  
  const globalPrefix = '/api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get('SERVICE_NAME') ?? 'JummAI APi')
    .setDescription('Api documentation for JummAI')
    .setVersion('1.0')
    .addTag('JummAI')
    .build();
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
