import { Post, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('GrabbMe API Docs')
    .setDescription('GrabbMe Backend API Documents')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // root Endpoint 설정
  app.setGlobalPrefix('api');

  // API 통신을 위한 validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(configService.get<number>('GATEWAY_PORT'));
}

bootstrap();
