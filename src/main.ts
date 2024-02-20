import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFilter } from '@app/shared';
// import * as fs from 'fs';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // };
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);
  const PORT = process.env.PORT || 3000;
  app.enableCors();

  const globalPrefix = '/api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
