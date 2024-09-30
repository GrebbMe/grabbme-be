import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';
import { swaggerExamples } from './swagger/public-data.swagger';

@Controller('public-data')
@ApiTags('Public Data API')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @Get('post')
  @ApiOperation({ summary: '전체 post category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 post category 데이터 조회',
    example: swaggerExamples.postCategory,
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @Get('post/:id')
  @ApiOperation({ summary: '특정 post category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 post category 데이터 조회',
    example: swaggerExamples.postCategory[0],
  })
  public async getPostCategoryById(@Param() { id }: BasicReqDto) {
    return await this.publicDataService.getPostCategoryById(id);
  }

  @Get('position')
  @ApiOperation({ summary: '전체 position category 데이터 조회' })
  @ApiOkResponse({
    example: swaggerExamples.positionCategory,
  })
  public getPositionCategories() {
    return this.publicDataService.getPositionCategories();
  }

  @Get('position/:id')
  @ApiOperation({ summary: '특정 position category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 position category 데이터 조회',
    example: swaggerExamples.positionCategory[0],
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  public getPositionCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getPositionCategoryById(id);
  }

  @Get('project')
  @ApiOperation({ summary: '전체 project category 데이터 조회' })
  @ApiOkResponse({
    example: swaggerExamples.projectCategory,
  })
  public getProjectCategories() {
    return this.publicDataService.getProjectCategories();
  }

  @Get('project/:id')
  @ApiOperation({ summary: '특정 project category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 project category 데이터 조회',
    example: swaggerExamples.projectCategory[0],
  })
  public getProjectCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getProjectCategoryById(id);
  }

  @Get('stack')
  @ApiOperation({ summary: '전체 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 stack category 데이터 조회',
    example: swaggerExamples.stackCategory,
  })
  public getStackCategories() {
    return this.publicDataService.getStackCategories();
  }

  @Get('stack/:id')
  @ApiOperation({ summary: '특정 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 stack category 데이터 조회',
    example: swaggerExamples.stackCategory[0],
  })
  public getStackCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getStackCategoryById(id);
  }

  @Get('career')
  @ApiOperation({ summary: '전체 career category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 career category 데이터 조회',
    example: swaggerExamples.careerCategory,
  })
  public getCareerCategories() {
    return this.publicDataService.getCareerCategories();
  }

  @Get('career/:id')
  @ApiOperation({ summary: '특정 career category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 career category 데이터 조회',
    example: swaggerExamples.careerCategory[0],
  })
  public getCareerCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getCareerCategoryById(id);
  }
}
