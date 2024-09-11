import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
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
  providers: [BoardService],
})
export class BoardModule {}
