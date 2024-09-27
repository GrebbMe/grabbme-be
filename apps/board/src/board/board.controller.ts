import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller()
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @MessagePattern({ cmd: 'get-all-boards' })
  public async getPosts() {
    return this.boardService.getPosts();
  }

  @MessagePattern({ cmd: 'get-one-board' })
  public async getPostById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getPostById(id);
  }

  @MessagePattern({ cmd: 'create-board' })
  public async createPost(@Payload() payload: CreateBoardDto) {
    const data = { ...payload };
    return this.boardService.createPost(data);
  }

  @MessagePattern({ cmd: 'update-board' })
  public async updatePost(@Payload() payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    const { id, updateBoardDto } = payload;
    return this.boardService.updatePost(id, updateBoardDto);
  }

  @MessagePattern({ cmd: 'delete-board' })
  public async deletePost(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.deletePost(id);
  }
}
