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
  public async getOneBoard(@Payload() data: { id: number }) {
    return this.boardService.getOneBoard(data.id);
  }

  @MessagePattern({ cmd: 'create-board' })
  public async createBoard(@Payload() data: CreateBoardDto) {
    return this.boardService.createBoard(data);
  }

  @MessagePattern({ cmd: 'update-board' })
  public async updateBoard(@Payload() data: { id: number; updateData: UpdateBoardDto }) {
    return this.boardService.updateBoard(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete-board' })
  public async deleteBoard(@Payload() data: { id: number }) {
    return this.boardService.deleteBoard(data.id);
  }
}
