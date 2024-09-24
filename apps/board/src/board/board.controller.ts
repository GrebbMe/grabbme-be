import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @MessagePattern({ cmd: 'get-all-boards' })
  public async getAllBoards() {
    return this.boardService.getAllBoards();
  }

  @MessagePattern({ cmd: 'get-one-board' })
  public async getOneBoard(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.getOneBoard(id);
  }

  @MessagePattern({ cmd: 'create-board' })
  public async createBoard(@Payload() payload: CreateBoardDto) {
    const data = { ...payload };
    return this.boardService.createBoard(data);
  }

  @MessagePattern({ cmd: 'update-board' })
  public async updateBoard(@Payload() payload: { id: number; updateData: UpdateBoardDto }) {
    const { id, updateData } = payload;
    return this.boardService.updateBoard(id, updateData);
  }

  @MessagePattern({ cmd: 'delete-board' })
  public async deleteBoard(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.boardService.deleteBoard(id);
  }
}
