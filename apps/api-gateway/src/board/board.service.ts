import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  public constructor(@Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy) {}

  public async getAllBoards() {
    return await this.boardClient.send({ cmd: 'get-all-boards' }, {});
  }

  public async getOneBoard(id: string) {
    return await this.boardClient.send({ cmd: 'get-one-board' }, { id });
  }

  public async createBoard(createBoardDto: CreateBoardDto) {
    return await this.boardClient.send({ cmd: 'create-board' }, { createBoardDto });
  }

  public async updateBoard(id: string, updateData: UpdateBoardDto) {
    return await this.boardClient.send({ cmd: 'update-board' }, { id, updateData });
  }

  public async deleteBoard(id: string) {
    return await this.boardClient.send({ cmd: 'delete-board' }, { id });
  }
}
