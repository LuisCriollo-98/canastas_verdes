import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // permitir hacer validación para que se cumpla el tipo de dato en el DTO
    })
  );
  app.enableCors({
    origin: 'http://localhost:3001', // tu frontend
  });
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
