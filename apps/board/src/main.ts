import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = Number(process.env.BOARD_PORT);
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
