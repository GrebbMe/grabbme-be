import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/req.dto';

@Controller('board')
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @Get('category/:postCategoryId')
  @ApiOperation({ summary: 'post_category_id 별 전체 게시글 조회' })
  @ApiOkResponse({
    description: 'post_category_id 별 전체 게시글 조회 성공',
    example: [],
  })
  public async getPostsByPostCategory(@Param('postCategoryId') postCategoryId: number) {
    return await this.boardService.getPostsByPostCategory(postCategoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({})
  public async getPostById(@Param('id') id: number) {
    return await this.boardService.getPostById(id);
  }

  @Post('category/:postCategoryId')
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
    example: {},
  })
  public async createPost(
    @Param('postCategoryId') postCategoryId: number,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    const payload = { postCategoryId, createBoardDto };
    return await this.boardService.createPost(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiOkResponse({
    description: '게시글 수정',
    example: {},
  })
  public async updatePost(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    const payload = { id, updateBoardDto };
    return await this.boardService.updatePost(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiNoContentResponse({
    description: '게시글 삭제 완료',
  })
  public async deletePost(@Param('id') id: number) {
    return await this.boardService.deletePost(id);
  }
}
