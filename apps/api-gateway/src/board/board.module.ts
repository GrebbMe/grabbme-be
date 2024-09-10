import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

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
            host: 'localhost',
            port: Number(process.env.BOARD_PORT),
          },
        });
      },
    },
  ],
  exports: [BoardService],
})
export class BoardModule {}
