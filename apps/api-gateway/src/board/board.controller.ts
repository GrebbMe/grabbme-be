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
  @ApiOperation({ summary: 'post_category_id 별 전체 게시글 전체 조회' })
  @ApiOkResponse({
    description: 'post_category_id 별 전체 게시글 전체 조회',
    example: [
      {
        post_id: 1,
        title: '프로젝트명',
        content: '프로젝트 내용',
        expired_at: '2024-10-12T00:00:00.000Z',
        view_cnt: 0,
        bookmarked_cnt: 0,
        stack_category_id: ['1', '2'],
        post_category_id: {
          id: 2,
          post_category_name: '그랩존',
        },
      },
    ],
  })
  public async getPostsByPostCategoryId(@Param('postCategoryId') postCategoryId: number) {
    return await this.boardService.getPostsByPostCategoryId(postCategoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({
    description: '게시글 상세 조회',
    example: {
      post_id: 1,
      title: '프로젝트명',
      content: '프로젝트 내용',
      create_at: '2024-10-08T06:16:30.000Z',
      expired_at: '2024-10-12T00:00:00.000Z',
      view_cnt: 0,
      bookmarked_cnt: 0,
      is_open: true,
      project_category_id: ['3'],
      stack_category_id: ['1', '4'],
      post_category_id: {
        id: 2,
        post_category_name: '그랩존',
      },
      career_category_id: {
        career_category_id: 1,
        content: '0년차',
      },
      position_category_id: null,
    },
  })
  public async getPostById(@Param('id') id: number) {
    return await this.boardService.getPostById(id);
  }

  @Post('category/:postCategoryId')
  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
    example: {
      title: '프로젝트명',
      content: '프로젝트 소개',
      expired_at: '2024-10-10T00:00:00.000Z',
      project_category_id: [2, 4],
      stack_category_id: [4, 5],
      post_category_id: {
        id: 2,
      },
      career_category_id: null,
      position_category_id: null,
      post_id: 15,
      create_at: '2024-10-08T23:23:46.000Z',
      update_at: '2024-10-08T23:23:46.000Z',
      view_cnt: 0,
      bookmarked_cnt: 0,
      is_open: true,
    },
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
    example: {
      post_id: 6,
      title: '프로젝트명',
      content: '프로젝트 내용',
      create_at: '2024-10-08T06:16:30.000Z',
      update_at: '2024-10-08T23:34:23.000Z',
      expired_at: '2024-10-12T00:00:00.000Z',
      view_cnt: 0,
      bookmarked_cnt: 0,
      is_open: true,
      project_category_id: [3],
      stack_category_id: [1, 4],
      career_category_id: {
        career_category_id: 1,
        content: '0년차',
      },
      position_category_id: null,
    },
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
