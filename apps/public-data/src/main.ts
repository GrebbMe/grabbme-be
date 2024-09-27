import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();
  const PORT = Number(process.env.PUBLIC_DATA_PORT);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: PORT,
    },
  });

  await app.listen();

  console.info(`public-data-service Running On ${PORT} for TCP`);
}
bootstrap();
