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
    example: {
      status: 200,
      data: [
        {
          post_id: 72,
          title: '프로젝트명',
          content: '프로젝트 소개',
          expired_at: '2024-10-12',
          view_cnt: 0,
          bookmarked_cnt: 0,
          stack_category_id: ['4', '5'],
          post_category_id: 2,
        },
      ],
      message: 'get-all-post-by-post-category-id',
    },
  })
  public async getPostsByPostCategoryId(@Param('postCategoryId') postCategoryId: number) {
    return await this.boardService.getPostsByPostCategoryId(postCategoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiOkResponse({
    description: '게시글 상세 조회',
    example: {
      status: 200,
      data: {
        post_id: 89,
        title: '게시글 제목',
        content: '게시글 소개',
        start_month: '2024-10',
        end_month: '2024-11',
        create_at: '2024-10-15',
        expired_at: '2024-11-15',
        view_cnt: 0,
        bookmarked_cnt: 0,
        is_open: true,
        project_category_id: ['2', '3'],
        stack_category_id: ['4', '5'],
        post_category_id: 2,
        career_category_id: {
          career_category_id: 1,
          content: '0년차',
        },
      },
      message: 'get-one-post',
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
      status: 201,
      data: {
        title: '게시글 제목 ex.프론트엔드 개발자 OOO입니다.',
        content: '자기 소개 ex.저는 이러한 경험이 있습니다.',
        project_category_id: [2, 3],
        stack_category_id: [4, 5],
        post_category_id: 2,
        career_category_id: {
          career_category_id: 1,
          content: '0년차',
        },
        user_id: 4,
        start_month: null,
        end_month: null,
        expired_at: null,
        post_id: 101,
        create_at: '2024-10-15',
        update_at: '2024-10-15',
        view_cnt: 0,
        bookmarked_cnt: 0,
        is_open: true,
      },
      message: 'create-post',
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
      status: 200,
      data: {
        post_id: 74,
        title: '새로운 프로젝트명',
        content: '새로운 프로젝트 내용',
        start_month: '2024-12',
        end_month: '2024-12',
        create_at: '2024-10-14',
        update_at: '2024-10-15',
        expired_at: '2024-10-18',
        view_cnt: 0,
        bookmarked_cnt: 0,
        is_open: true,
        project_category_id: [1, 3],
        stack_category_id: [1, 2],
        career_category_id: {
          career_category_id: 1,
          content: '0년차',
        },
      },
      message: 'update-post',
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
    example: {
      status: 200,
      data: true,
      message: 'delete-post',
    },
  })
  public async deletePost(@Param('id') id: number) {
    return await this.boardService.deletePost(id);
  }
}
