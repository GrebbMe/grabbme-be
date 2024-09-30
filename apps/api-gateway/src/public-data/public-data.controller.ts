import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { publicDataExamples } from '@shared/constants/swagger-examples';
import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';

@Controller('public-data')
@ApiTags('Public Data API')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @Get('post-categories')
  @ApiOperation({ summary: '전체 post category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 post category 데이터 조회',
    example: publicDataExamples.postCategory,
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @Get('post-categories/:id')
  @ApiOperation({ summary: '특정 post category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 post category 데이터 조회',
    example: publicDataExamples.postCategory[0],
  })
  public async getPostCategoryById(@Param() { id }: BasicReqDto) {
    return await this.publicDataService.getPostCategoryById(id);
  }

  @Get('position-categories')
  @ApiOperation({ summary: '전체 position category 데이터 조회' })
  @ApiOkResponse({
    example: publicDataExamples.positionCategory,
  })
  public getPositionCategories() {
    return this.publicDataService.getPositionCategories();
  }

  @Get('position-categories/:id')
  @ApiOperation({ summary: '특정 position category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 position category 데이터 조회',
    example: publicDataExamples.positionCategory[0],
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  public getPositionCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getPositionCategoryById(id);
  }

  @Get('project-categories')
  @ApiOperation({ summary: '전체 project category 데이터 조회' })
  @ApiOkResponse({
    example: publicDataExamples.projectCategory,
  })
  public getProjectCategories() {
    return this.publicDataService.getProjectCategories();
  }

  @Get('project-categories/:id')
  @ApiOperation({ summary: '특정 project category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 project category 데이터 조회',
    example: publicDataExamples.projectCategory[0],
  })
  public getProjectCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getProjectCategoryById(id);
  }

  @Get('stack-categories')
  @ApiOperation({ summary: '전체 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 stack category 데이터 조회',
    example: publicDataExamples.stackCategory,
  })
  public getStackCategories() {
    return this.publicDataService.getStackCategories();
  }

  @Get('stack-categories/:id')
  @ApiOperation({ summary: '특정 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 stack category 데이터 조회',
    example: publicDataExamples.stackCategory[0],
  })
  public getStackCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getStackCategoryById(id);
  }

  @Get('career-categories')
  @ApiOperation({ summary: '전체 career category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 career category 데이터 조회',
    example: publicDataExamples.careerCategory,
  })
  public getCareerCategories() {
    return this.publicDataService.getCareerCategories();
  }

  @Get('career-categories/:id')
  @ApiOperation({ summary: '특정 career category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 career category 데이터 조회',
    example: publicDataExamples.careerCategory[0],
  })
  public getCareerCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getCareerCategoryById(id);
  }
}
