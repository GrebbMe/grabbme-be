import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicDataService } from './public-data.service';

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
}
