import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Post, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('GrabbMe API Docs')
    .setDescription('GrabbMe Backend API Documents')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // localhost:3000/docs -> 스웨거 문서 보는곳

  // root Endpoint 설정
  app.setGlobalPrefix('api'); // localhost:3000/api/~

  // API 통신을 위한 validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // DTO정해진 형식으로
      whitelist: true, // dto 정의 데이터 타입 외에 다른 데이터가 추가로 들어오는 것을 허용할지
    }),
  );

  await app.listen(process.env.GATEWAY_PORT || 3000);
}

bootstrap();
