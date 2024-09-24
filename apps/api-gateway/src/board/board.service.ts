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
    const data = { id: Number(id) };
    return await this.boardClient.send({ cmd: 'get-one-board' }, data);
  }

  public async createBoard(createBoardDto: CreateBoardDto) {
    const data = { ...createBoardDto };
    return await this.boardClient.send({ cmd: 'create-board' }, data);
  }

  public async updateBoard(id: string, updateData: UpdateBoardDto) {
    const data = { id, ...updateData };
    return await this.boardClient.send({ cmd: 'update-board' }, data);
  }

  public async deleteBoard(id: string) {
    const data = { id: Number(id) };
    return await this.boardClient.send({ cmd: 'delete-board' }, data);
  }
}
