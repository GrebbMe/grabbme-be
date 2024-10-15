import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from 'shared/constants/message-pattern';
import { CreateBoardDto, UpdateBoardDto } from './dto/req.dto';

@Injectable()
export class BoardService {
  public constructor(@Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy) {}

  public async getPostsByPostCategoryId(postCategoryId: number) {
    return await this.boardClient.send(MESSAGE.POST.GET_ALL_POST_BY_POST_CATEGORY_ID, {
      postCategoryId,
    });
  }

  public async getPostById(id: number) {
    return await this.boardClient.send(MESSAGE.POST.GET_ONE_POST, { id });
  }

  public async createPost(payload: { postCategoryId: number; createBoardDto: CreateBoardDto }) {
    return await this.boardClient.send(MESSAGE.POST.CREATE_POST, payload);
  }

  public async updatePost(payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    return await this.boardClient.send(MESSAGE.POST.UPDATE_POST, payload);
  }

  public async deletePost(id: number) {
    return await this.boardClient.send(MESSAGE.POST.DELETE_POST, { id });
  }
}
