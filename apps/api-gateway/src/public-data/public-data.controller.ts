import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';
import {
  CareerCategoryResDto,
  PositionCategoryResDto,
  PostCategoryResDto,
  ProjectCategoryResDto,
  StackCategoryResDto,
} from './dto/res.dto';

@Controller('public-data')
@ApiTags('Public Data API')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @ApiOperation({ summary: '전체 post category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 post category 데이터 조회',
    type: [PostCategoryResDto],
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  @Get('post-categories')
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @ApiOperation({ summary: '특정 post category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 post category 데이터 조회',
    type: PostCategoryResDto,
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('post-categories/:id')
  public async getPostCategoryById(@Param() { id }: BasicReqDto) {
    return await this.publicDataService.getPostCategoryById(id);
  }

  @ApiOperation({ summary: '전체 position category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 position category 데이터 조회',
    type: [PositionCategoryResDto],
  })
  @Get('position-categories')
  public getPositionCategories() {
    return this.publicDataService.getPositionCategories();
  }

  @Get('/position-categories/:id')
  @ApiOperation({ summary: '특정 position category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 position category 데이터 조회',
    type: PositionCategoryResDto,
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  public getPositionCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getPositionCategoryById(id);
  }

  @ApiOperation({ summary: '전체 project category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 project category 데이터 조회',
    type: [ProjectCategoryResDto],
  })
  @Get('project-categories')
  public getProjectCategories() {
    return this.publicDataService.getProjectCategories();
  }

  @ApiOperation({ summary: '특정 project category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 project category 데이터 조회',
    type: ProjectCategoryResDto,
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('project-categories/:id')
  public getProjectCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getProjectCategoryById(id);
  }

  @ApiOperation({ summary: '전체 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 stack category 데이터 조회',
    type: [StackCategoryResDto],
  })
  @Get('stack-categories')
  public getStackCategories() {
    return this.publicDataService.getStackCategories();
  }

  @ApiOperation({ summary: '특정 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 stack category 데이터 조회',
    type: StackCategoryResDto,
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('stack-categories/:id')
  public getStackCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getStackCategoryById(id);
  }

  @ApiOperation({ summary: '전체 career category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 career category 데이터 조회',
    type: [CareerCategoryResDto],
  })
  @Get('career-categories')
  public getCareerCategories() {
    return this.publicDataService.getCareerCategories();
  }

  @ApiOperation({ summary: '특정 career category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 career category 데이터 조회',
    type: CareerCategoryResDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Get('career-categories/:id')
  public getCareerCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getCareerCategoryById(id);
  }

  @Get('stack-graph')
  @ApiOperation({ summary: 'stack graph 데이터 조회' })
  @ApiOkResponse({
    description: 'stack graph 데이터 조회',
    example: [
      {
        stack_graph_id: 65,
        stack_id: 65,
        stack_name: 'Spring',
        apply_cnt: 480,
      },
      {
        stack_graph_id: 1,
        stack_id: 1,
        stack_name: 'React',
        apply_cnt: 321,
      },
      {
        stack_graph_id: 9,
        stack_id: 9,
        stack_name: 'Spring Boot',
        apply_cnt: 321,
      },
      {
        stack_graph_id: 48,
        stack_id: 48,
        stack_name: 'Python',
        apply_cnt: 320,
      },
      {
        stack_graph_id: 15,
        stack_id: 15,
        stack_name: 'Node.js',
        apply_cnt: 280,
      },
      {
        stack_graph_id: 52,
        stack_id: 52,
        stack_name: 'C++',
        apply_cnt: 270,
      },
      {
        stack_graph_id: 45,
        stack_id: 45,
        stack_name: 'TypeScript',
        apply_cnt: 185,
      },
      {
        stack_graph_id: 17,
        stack_id: 17,
        stack_name: 'PostgreSQL',
        apply_cnt: 153,
      },
      {
        stack_graph_id: 7,
        stack_id: 7,
        stack_name: 'NestJS',
        apply_cnt: 127,
      },
      {
        stack_graph_id: 58,
        stack_id: 58,
        stack_name: 'React Native',
        apply_cnt: 119,
      },
    ],
  })
  public getStackGraph() {
    return this.publicDataService.getStackGraphs();
  }

  @Get('apply-graph')
  @ApiOperation({ summary: 'apply graph 데이터 조회' })
  @ApiOkResponse({
    description: 'apply graph 데이터 조회',
    example: [],
  })
  public getApplyGraph() {
    return this.publicDataService.getApplyGraphs();
  }
}
