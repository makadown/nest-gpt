import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this is going to verify each and every endpoint
  app.useGlobalPipes( new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
