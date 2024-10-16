import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroRpcExceptionFilter } from '@shared/filter/rpc-exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();
  const PORT = Number(process.env.BOARD_PORT);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost', // 'board-service',
      port: PORT,
    },
  });

  app.useGlobalFilters(new MicroRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();

  console.info(`board-service Running On ${PORT} for TCP`);
}
bootstrap();
