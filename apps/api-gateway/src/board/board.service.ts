import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from 'shared/constants/message-pattern';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  public constructor(@Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy) {}

  public async getPosts() {
    return await this.boardClient.send(MESSAGE.POST_DATA.POST.GET_ALL_POST, {});
  }

  public async getPostById(id: number) {
    const data = { id };
    return await this.boardClient.send(MESSAGE.POST_DATA.POST.GET_ONE_POST, data);
  }

  public async createPost(createBoardDto: CreateBoardDto) {
    const data = { ...createBoardDto };
    return await this.boardClient.send(MESSAGE.POST_DATA.POST.CREATE_POST, data);
  }

  public async updatePost(payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    return await this.boardClient.send(MESSAGE.POST_DATA.POST.UPDATE_POST, payload);
  }

  public async deletePost(id: number) {
    const data = { id };
    return await this.boardClient.send(MESSAGE.POST_DATA.POST.DELETE_POST, data);
  }
}
