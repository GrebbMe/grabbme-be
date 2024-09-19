import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostCategoryMessagePattern } from '@shared/constants/message-pattern';
import { PublicDataService } from './public-data.service';
import { GetOnePostCategoryDataDto } from './dto/get-one-post-category.dto';

@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @MessagePattern(PostCategoryMessagePattern.GET_POST_DATA)
  private async getPostData() {
    return await this.publicDataService.getPostData();
  }

  @MessagePattern(PostCategoryMessagePattern.GET_ONE_POST_DATA)
  private async getOnePostData(@Payload() getOnePostCategoryDataDto: GetOnePostCategoryDataDto) {
    const { id } = getOnePostCategoryDataDto;
    return await this.publicDataService.getOnePostData(id);
  }
}
