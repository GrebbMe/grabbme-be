import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';


@Controller('board')
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  @ApiOkResponse({
    description: '전체 게시글 조회',
  })
  public async getAllBoards() {
    return await this.boardService.getAllBoards();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({
    description: '게시글 상세 조회',
  })
  public async getOneBoard(@Param('id') postId: string) {
    return await this.boardService.getOneBoard(postId);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
   
  })
  public async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiOkResponse({
    description: '게시글 수정',
  })
  public async updateBoard(@Param('id') updateId: string, @Body() updateData: UpdateBoardDto) {
    return await this.boardService.updateBoard(updateId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiCreatedResponse({
    description: '게시글 삭제',
  })
  public async deleteBoard(@Param('id') deleteId: string) {
    return await this.boardService.deleteBoard(deleteId);
  }
}
