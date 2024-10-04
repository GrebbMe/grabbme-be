import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from 'shared/constants/message-pattern';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller()
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @MessagePattern(MESSAGE.POST_DATA.POST.GET_ALL_POST)
  public async getPosts(@Payload() payload: { postCategoryId: number }) {
    const { postCategoryId } = payload;
    return this.boardService.getPosts(postCategoryId);
  }

  @MessagePattern(MESSAGE.POST_DATA.POST.GET_ONE_POST)
  public async getPostById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getPostById(id);
  }

  @MessagePattern(MESSAGE.POST_DATA.POST.CREATE_POST)
  public async createPost(
    @Payload() payload: { postCategoryId: number; createBoardDto: CreateBoardDto },
  ) {
    const { postCategoryId, createBoardDto } = payload;
    return this.boardService.createPost(postCategoryId, createBoardDto);
  }

  @MessagePattern(MESSAGE.POST_DATA.POST.UPDATE_POST)
  public async updatePost(@Payload() payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    const { id, updateBoardDto } = payload;
    return this.boardService.updatePost(id, updateBoardDto);
  }

  @MessagePattern(MESSAGE.POST_DATA.POST.DELETE_POST)
  public async deletePost(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.deletePost(id);
  }
}
