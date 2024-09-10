import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.BOARD_PORT ? +process.env.BOARD_PORT : 3002;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost', // 'board-service',
        port: PORT,
      },
    },
  );

  await app.listen();
  console.info(`board-service Running On ${PORT} for TCP`);
}
bootstrap();
