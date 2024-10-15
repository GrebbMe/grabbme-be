import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(process.env.CHAT_PORT);

  app.useWebSocketAdapter(new IoAdapter(app));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: Number(process.env.CHAT_PORT),
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.CHAT_GATEWAY_PORT);

  console.info(`chat-service Running On ${PORT} for TCP`);
}
bootstrap();
