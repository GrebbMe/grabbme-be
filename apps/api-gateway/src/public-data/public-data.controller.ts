import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicDataService } from './public-data.service';

@Controller('public-data')
@ApiTags('Public Data API')
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @Get('post')
  @ApiOperation({ summary: '전체 post category 데이터 조회' })
  @ApiCreatedResponse({
    description: '전체 post category 데이터 조회',
  })
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @Get('post/:id')
  @ApiOperation({ summary: '특정 post category 데이터 조회' })
  @ApiCreatedResponse({
    description: '특정 post category 데이터 조회',
  })
  public async getPostCategoryById(@Param('id') id: number) {
    return await this.publicDataService.getPostCategoryById(id);
  }
}
