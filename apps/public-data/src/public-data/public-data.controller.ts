import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { PublicDataService } from './public-data.service';
import { GetOnePostCategoryDto } from './dto/get-one-post-category.dto';

@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY)
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY)
  public async getOnePostData(@Payload() getOnePostCategoryDataDto: GetOnePostCategoryDto) {
    const { id } = getOnePostCategoryDataDto;
    return await this.publicDataService.getPostCategoryById(id);
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY)
  public async getPositionCategories() {
    return await this.publicDataService.getPositionCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY)
  public async getPositionCategoryById(@Payload() payload: GetOnePostCategoryDto) {
    return await this.publicDataService.getPositionCategoryById(payload.id);
  }
}
