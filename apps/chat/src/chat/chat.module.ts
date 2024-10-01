import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.CHAT_PORT),
        },
      },
    ]),
  ],
  exports: [ChatService, ChatGateway],

  controllers: [ChatController],

  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
