import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://miulai.ge' , 'https://admin.miulai.ge'], // Replace with your allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials if needed
  });  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
