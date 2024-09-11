import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}
  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  findAll() {
    return `This action returns all board`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
