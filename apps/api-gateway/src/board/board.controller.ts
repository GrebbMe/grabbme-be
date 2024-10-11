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
        post_id: 22,
        title: '프로젝트명 ex.금융앱 사이드 프로젝트 팀원 모집',
        content: '프로젝트 소개 ex.저희는 이런 앱을 만들고자 합니다. (최소 200 ~ 500 이내)',
        expired_at: '2024-10-12',
        view_cnt: 0,
        bookmarked_cnt: 0,
        stack_category_id: ['4', '5'],
        post_category_id: 1,
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
      post_id: 6,
      title: '프로젝트명',
      content: '프로젝트 내용',
      create_at: '2024-10-08',
      expired_at: '2024-10-12',
      view_cnt: 0,
      bookmarked_cnt: 0,
      is_open: true,
      project_category_id: ['1'],
      stack_category_id: ['1', '2'],
      post_category_id: 2,
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
      title: '프로젝트명 ex.금융앱 사이드 프로젝트 팀원 모집',
      content: '프로젝트 소개 ex.저희는 이런 앱을 만들고자 합니다. (최소 200 ~ 500 이내)',
      expired_at: '2024-10-12',
      project_category_id: [2, 4],
      stack_category_id: [4, 5],
      post_category_id: 1,
      career_category_id: null,
      position_category_id: null,
      post_id: 31,
      create_at: '2024-10-11',
      update_at: '2024-10-11',
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
      post_id: 2,
      title: '프로젝트명',
      content: '프로젝트 내용',
      create_at: '2024-10-07',
      update_at: '2024-10-11',
      expired_at: '2024-10-23',
      view_cnt: 0,
      bookmarked_cnt: 0,
      is_open: true,
      project_category_id: [1, 3],
      stack_category_id: [1, 2],
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
