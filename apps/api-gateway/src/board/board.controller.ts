import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  CreateBoardDto,
  CreateParticipantDto,
  UpdateBoardDto,
  UpdateParticipantDto,
} from './dto/req.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  @Get('category/:postCategoryId/search')
  @ApiOperation({ summary: 'post_category_id 별 조회, 검색 필터 조회' })
  @ApiOkResponse({
    description: 'post_category_id 별 전체 게시글 전체 조회',
    example: {
      status: 200,
      data: {
        totalPost: 6,
        posts: [
          {
            post_id: 77,
            title: '프로젝트명 ex.금융앱 사이드 프로젝트 팀원 모집',
            content: '프로젝트 소개 ex.저희는 이런 앱을 만들고자 합니다. (최소 200 ~ 500 이내)',
            expired_at: '2024-10-12T00:00:00.000Z',
            view_cnt: 0,
            bookmarked_cnt: 2,
            stack_category_id: ['4', '5'],
            post_category_id: {
              id: 2,
              post_category_name: '그랩존',
            },
            career_category_id: null,
          },
        ],
      },
      message: 'get-all-post-by-post-category-id',
    },
  })
  public async getPostsByPostCategoryId(
    @Param('postCategoryId') postCategoryId: number,
    @Query('search') search?: string,
    @Query('stack') stack?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const payload = { postCategoryId, search, stack, page, limit };
    return await this.boardService.getPostsByPostCategoryId(payload);
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

  @Post('/apply/:postId')
  @ApiOperation({ summary: '게시글 신청' })
  @ApiOkResponse({
    description: '게시글 신청 완료',
    example: {
      status: 201,
      data: {
        user_id: 4,
        nickname: 'nickname',
        email: 'nickname@google.com',
        post_id: 88,
      },
      message: 'create-participant',
    },
  })
  public async createParticipant(
    @Param('postId') postId: number,
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    const payload = { postId, createParticipantDto };
    return await this.boardService.createParticipant(payload);
  }

  @Patch('/apply/:postId')
  @ApiOperation({ summary: '신청자 상태 변경' })
  @ApiOkResponse({
    description: '상태 변경 완료',
    example: {
      status: 200,
      data: {
        participants_id: 2,
        status: 'accept',
      },
      message: 'update-participant-status',
    },
  })
  public async updateParticipantStatus(
    @Param('postId') postId: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    const payload = { postId, updateParticipantDto };
    return await this.boardService.updateParticipantStatus(payload);
  }

  @Get('/apply-users/:postId')
  @ApiOperation({ summary: '게시글 신청자 조회' })
  @ApiOkResponse({
    description: '게시글 신청자 조회',
    example: {
      status: 200,
      data: [
        {
          user_id: 5,
          nickname: 'nickname',
          email: 'nickname@google.com',
        },
      ],
      message: 'get-participants-by-post',
    },
  })
  public async getApplyByParticipnat(@Param('postId') postId: number) {
    return await this.boardService.getApplyByParticipnat(postId);
  }

  @Post('bookmark/:id')
  @ApiOperation({ summary: '북마크 생성' })
  @ApiParam({ name: 'id', description: '게시글 id' })
  @ApiBody({ description: 'userId', type: 'number' })
  @ApiCreatedResponse({
    description: '북마크 생성',
    example: {
      status: 201,
      data: {
        bookmark_id: 2,
        user_id: 4,
        post_id: 88,
      },
      message: 'create-bookmark',
    },
  })
  @ApiBadRequestResponse({
    example: {
      status: 400,
      timestamp: '2024-10-15',
      path: '/api/board/bookmark',
      message: '이미 북마크한 게시글입니다.',
    },
  })
  public async createBookmark(@Body() { userId }: { userId: number }, @Param('id') postId: number) {
    return await this.boardService.createBookmark({ userId, postId });
  }

  @ApiOperation({ summary: '북마크 삭제' })
  @ApiParam({ name: 'id', description: '게시글 id' })
  @ApiBody({ description: 'userId', type: 'number' })
  @ApiOkResponse({
    description: '북마크 삭제',
    example: {
      status: 200,
      data: true,
      message: 'delete-bookmark',
    },
  })
  @ApiBadRequestResponse({
    example: {
      status: 400,
      timestamp: '2024-10-15',
      path: '/api/board/bookmark',
      message: '존재하지 않는 북마크 입니다.',
    },
  })
  @Delete('bookmark/:id')
  public async deleteBookmark(@Body() { userId }: { userId: number }, @Param('id') postId: number) {
    return await this.boardService.deleteBookmark({ userId, postId });
  }

  @Get('bookmark/info/:email')
  public async getBookmarkInfo(@Param('email') email: string) {
    return await this.boardService.getBookmarksByUserEmail(email);
  }

  @Get('/project-view/popular')
  public async getPopularProject() {
    return await this.boardService.getPopularProjects();
  }

  @Get('/project-view/closing')
  public async getClosingProject() {
    return await this.boardService.getClosingProjects();
  }
}
