import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.USER_PORT ? +process.env.USER_PORT : 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost', // 'user-service',
        port: PORT,
      },
    },
  );
  await app.listen();
  console.info(`user-service Running On ${PORT} for TCP`);
}
bootstrap();
