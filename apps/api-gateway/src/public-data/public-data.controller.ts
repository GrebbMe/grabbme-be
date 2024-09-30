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
}
