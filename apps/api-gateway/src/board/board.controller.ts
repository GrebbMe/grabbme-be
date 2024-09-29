import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
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
    example: [
      {
        post_id: 1,
        title: '게시물 제목',
        content: '게시물 내용',
        update_at: '2024-10-01T00:00:12',
        create_at: '2024-10-03T00:00:12',
        expired_at: '2024-10-06T00:00:12',
        view_cnt: 15,
        bookmarked_cnt: 3,
        is_open: true,
      },
      {
        post_id: 2,
        title: '게시물 제목2',
        content: '게시물 내용2',
        update_at: '2024-10-01T00:00:12',
        create_at: '2024-10-03T00:00:12',
        expired_at: '2024-10-06T00:00:12',
        view_cnt: 13,
        bookmarked_cnt: 52,
        is_open: true,
      },
    ],
  })
  public async getPosts() {
    return await this.boardService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({
    description: '게시글 상세 조회',
    example: {
      post_id: 1,
      title: '게시물 제목',
      content: '게시물 내용',
      update_at: '2024-10-01T00:00:12',
      create_at: '2024-10-03T00:00:12',
      expired_at: '2024-10-06T00:00:12',
      view_cnt: 15,
      bookmarked_cnt: 3,
      is_open: true,
    },
  })
  public async getPostById(@Param('id') id: string) {
    return await this.boardService.getPostById(id);
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
    example: {
      post_id: 1,
      title: '게시물 제목',
      content: '게시물 내용',
      update_at: '2024-10-01T00:00:12',
      create_at: '2024-10-03T00:00:12',
      expired_at: '2024-10-06T00:00:12',
      view_cnt: 15,
      bookmarked_cnt: 3,
      is_open: true,
    },
  })
  public async createPost(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createPost(createBoardDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiOkResponse({
    description: '게시글 수정',
    example: {
      post_id: 1,
      title: '수정된 게시물 제목',
      content: '수정된 게시물 내용',
      update_at: '2024-10-01T00:00:12',
      create_at: '2024-10-03T00:00:12',
      expired_at: '2024-10-06T00:00:12',
      view_cnt: 15,
      bookmarked_cnt: 3,
      is_open: false,
    },
  })
  public async updatePost(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const payload = { id: Number(id), updateBoardDto };
    return await this.boardService.updatePost(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiNoContentResponse({
    description: '게시글 삭제 완료',
  })
  public async deletePost(@Param('id') id: string) {
    return await this.boardService.deletePost(id);
  }
}
