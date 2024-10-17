import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { CHAT_LIST_SCHEMA, ChatList } from './entities/chat-list.entity';
import { CHAT_ROOM_SCHEMA, ChatRoom } from './entities/chat-room.entity';
import { CHAT_SCHEMA, Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from '@apps/user/src/user/entities/user.entity';
import { CareerCategory, PostCategory, PositionCategory } from '@publicData/entities';

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
    TypeOrmModule.forFeature([Board, PostCategory, CareerCategory, User, PositionCategory]),
    MongooseModule.forFeature([
      {
        name: ChatRoom.name,
        schema: CHAT_ROOM_SCHEMA,
      },
      {
        name: ChatList.name,
        schema: CHAT_LIST_SCHEMA,
      },
      {
        name: Chat.name,
        schema: CHAT_SCHEMA,
      },
    ]),
  ],
  exports: [ChatService, ChatGateway],

  controllers: [ChatController],

  providers: [ChatService, ChatGateway, LoggingInterceptor, Logger],
})
export class ChatModule {}
