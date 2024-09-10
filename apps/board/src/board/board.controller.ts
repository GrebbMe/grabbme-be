import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @MessagePattern('createBoard')
  create(@Payload() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @MessagePattern('findAllBoard')
  findAll() {
    return this.boardService.findAll();
  }

  @MessagePattern('findOneBoard')
  findOne(@Payload() id: number) {
    return this.boardService.findOne(id);
  }

  @MessagePattern('updateBoard')
  update(@Payload() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(updateBoardDto.id, updateBoardDto);
  }

  @MessagePattern('removeBoard')
  remove(@Payload() id: number) {
    return this.boardService.remove(id);
  }
}
