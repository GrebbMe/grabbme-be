import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CareerCategory,
  PositionCategory,
  PostCategory,
  ProjectCategory,
  StackCategory,
} from '@publicData/entities';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board, Participant, Team } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      CareerCategory,
      PositionCategory,
      PostCategory,
      ProjectCategory,
      StackCategory,
      Team,
      Participant,
    ]),
    ClientsModule.register([
      {
        name: 'BOARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.BOARD_PORT),
        },
      },
    ]),
  ],
  exports: [BoardService],
  controllers: [BoardController],
  providers: [BoardService, LoggingInterceptor, Logger],
})
export class BoardModule {}
