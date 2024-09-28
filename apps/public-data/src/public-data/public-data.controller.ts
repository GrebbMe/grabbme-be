import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';

@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY)
  public async getPostCategories() {
    return await this.publicDataService.getPostCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY)
  public async getOnePostData(@Payload() payload: BasicReqDto) {
    return await this.publicDataService.getPostCategoryById(payload.id);
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY)
  public async getPositionCategories() {
    return await this.publicDataService.getPositionCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY)
  public async getPositionCategoryById(@Payload() payload: BasicReqDto) {
    return await this.publicDataService.getPositionCategoryById(payload.id);
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY)
  public async getProjectCategories() {
    return await this.publicDataService.getProjectCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY)
  public async getProjectCategoryById(@Payload() payload: BasicReqDto) {
    return await this.publicDataService.getProjectCategoryById(payload.id);
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY)
  public async getStackCategories() {
    return await this.publicDataService.getStackCategories();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY)
  public async getStackCategoryById(@Payload() payload: BasicReqDto) {
    return await this.publicDataService.getStackCategoryById(payload.id);
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ALL_CAREER_CATEGORY)
  public async getCareerCategories() {
    return await this.publicDataService.findAllCareerCategory();
  }

  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ONE_CAREER_CATEGORY)
  public async getCareerCategoryById(@Payload() payload: BasicReqDto) {
    return await this.publicDataService.findOneCareerCategoryById(payload.id);
  }
}
