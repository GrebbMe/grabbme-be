import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  exports: [BoardService],
  controllers: [BoardController],
  providers: [
    BoardService,
    {
      provide: 'BOARD_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost', // 'board-service
            port: process.env.BOARD_PORT ? +process.env.BOARD_PORT : 3002,
          },
        });
      },
    },
  ],
})
export class BoardModule {}
