import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3030',
      'http://127.0.0.1:3030'
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3030);
}
bootstrap();
