import { Controller } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  // @MessagePattern('createBoard')
  // create(@Payload() createBoardDto: CreateBoardDto) {
  //   return this.boardService.create(createBoardDto);
  // }
}
