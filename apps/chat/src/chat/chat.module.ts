import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { CHAT_ROOM_SCHEMA, ChatRoom } from './entity/chat-room.entity';

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
    MongooseModule.forFeature([
      {
        name: ChatRoom.name,
        schema: CHAT_ROOM_SCHEMA,
      },
    ]),
  ],
  exports: [ChatService, ChatGateway],

  controllers: [ChatController],

  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
