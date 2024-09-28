import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';

@Controller('public-data')
@ApiTags('Public Data API')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @Get('post')
  @ApiOperation({ summary: '전체 post category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 post category 데이터 조회',
    example: [
      {
        id: 1,
        post_category_name: '팀원 모집',
      },
      {
        id: 2,
        post_category_name: '인재 등록',
      },
    ],
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
  })
  public async getPostCategoryById(@Param('id') id: number) {
    return await this.publicDataService.getPostCategoryById(id);
  }

  @Get('position')
  @ApiOperation({ summary: '전체 position category 데이터 조회' })
  @ApiOkResponse({
    example: [
      {
        position_category_id: 1,
        name: 'Frontend Developer',
        kor_name: '프론트엔드 개발자',
        abbreviation: 'FE',
      },
      {
        position_category_id: 2,
        name: 'Backend Developer',
        kor_name: '백엔드 개발자',
        abbreviation: 'BE',
      },
    ],
  })
  public getPositionCategories() {
    return this.publicDataService.getPositionCategories();
  }

  @Get('position/:id')
  @ApiOperation({ summary: '특정 position category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 position category 데이터 조회',
    example: {
      position_category_id: 1,
      name: 'Frontend Developer',
      kor_name: '프론트엔드 개발자',
      abbreviation: 'FE',
    },
  })
  @ApiNotFoundResponse({
    description: '데이터가 없습니다.',
  })
  public getPositionCategoryById(@Param('id') id: number) {
    console.info(id);
    return this.publicDataService.getPositionCategoryById(id);
  }

  @Get('project')
  @ApiOperation({ summary: '전체 project category 데이터 조회' })
  @ApiOkResponse({
    example: [
      {
        project_category_id: 1,
        name: '프로젝트 1',
      },
      {
        project_category_id: 2,
        name: '프로젝트 2',
      },
    ],
  })
  public getProjectCategories() {
    return this.publicDataService.getProjectCategories();
  }

  @Get('project/:id')
  @ApiOperation({ summary: '특정 project category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 project category 데이터 조회',
    example: {
      project_category_id: 1,
      name: '프로젝트 1',
    },
  })
  public getProjectCategoryById(@Param('id') id: number) {
    return this.publicDataService.getProjectCategoryById(id);
  }

  @Get('stack')
  @ApiOperation({ summary: '전체 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 stack category 데이터 조회',
    example: [
      { stakc_category_id: 1, name: 'React', kor_name: '리액트', category: 'Frontend' },
      { stakc_category_id: 2, name: 'NestJS', kor_name: '네스트JS', category: 'Backend' },
    ],
  })
  public getStackCategories() {
    return this.publicDataService.getStackCategories();
  }

  @Get('stack/:id')
  @ApiOperation({ summary: '특정 stack category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 stack category 데이터 조회',
    example: { stakc_category_id: 1, name: 'React', kor_name: '리액트', category: 'Frontend' },
  })
  public getStackCategoryById(@Param() { id }: BasicReqDto) {
    console.info(id);
    return this.publicDataService.getStackCategoryById(id);
  }

  @Get('career')
  @ApiOperation({ summary: '전체 career category 데이터 조회' })
  @ApiOkResponse({
    description: '전체 career category 데이터 조회',
    example: [
      { career_category_id: 1, content: '0년차' },
      { career_category_id: 2, content: '1~3년차' },
    ],
  })
  public getCareerCategories() {
    return this.publicDataService.getCareerCategories();
  }

  @Get('career/:id')
  @ApiOperation({ summary: '특정 career category 데이터 조회' })
  @ApiOkResponse({
    description: '특정 career category 데이터 조회',
    example: { career_category_id: 1, content: '0년차' },
  })
  public getCareerCategoryById(@Param() { id }: BasicReqDto) {
    return this.publicDataService.getCareerCategoryById(id);
  }
}
