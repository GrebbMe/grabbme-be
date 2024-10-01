import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  exports: [ChatService],
  controllers: [ChatController],
  providers: [
    ChatService,

    {
      provide: 'CHAT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: Number(process.env.CHAT_PORT),
          },
        });
      },
    },
  ],
})
export class ChatModule {}
