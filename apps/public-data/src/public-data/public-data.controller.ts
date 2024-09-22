import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { publicDataMessages } from '@shared/constants/message-pattern';
import { PublicDataService } from './public-data.service';
import { GetOnePostCategoryDto } from './dto/get-one-post-category.dto';

@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @MessagePattern(publicDataMessages.POST_CATEGORY.GET_ALL_POST_CATEGORY)
  private async getPostData() {
    return await this.publicDataService.getAllPostCategories();
  }

  @MessagePattern(publicDataMessages.POST_CATEGORY.GET_ONE_POST_CATEGORY)
  private async getOnePostData(@Payload() getOnePostCategoryDataDto: GetOnePostCategoryDto) {
    const { id } = getOnePostCategoryDataDto;
    return await this.publicDataService.getPostCategoryById(id);
  }
}
