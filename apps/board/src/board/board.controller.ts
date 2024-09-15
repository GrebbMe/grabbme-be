import { Controller } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
	public constructor(private readonly boardService: BoardService) {}
}
