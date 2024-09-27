import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
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
  public async getPosts() {
    return await this.boardService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({
    description: '게시글 상세 조회',
  })
  public async getPostById(@Param('id') id: string) {
    return await this.boardService.getPostById(id);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
  })
  public async createPost(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createPost(createBoardDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiOkResponse({
    description: '게시글 수정',
  })
  public async updatePost(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const payload = { id: Number(id), updateBoardDto };
    return await this.boardService.updatePost(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiCreatedResponse({
    description: '게시글 삭제',
  })
  public async deletePost(@Param('id') id: string) {
    return await this.boardService.deletePost(id);
  }
}
