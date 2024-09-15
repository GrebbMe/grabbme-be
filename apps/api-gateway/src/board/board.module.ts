import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [
    BoardService,
    {
      provide: 'BOARD_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost', // 'board-service'
            port: Number(process.env.BOARD_PORT),
          },
        });
      },
    },
  ],
  exports: [BoardService],
})
export class BoardModule {}
