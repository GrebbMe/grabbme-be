import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { setResponse } from '@shared/decorator/set-response.decorator';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { TransformInterceptor } from '@shared/interceptor/transform.interceptor';
import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @setResponse(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY)
  public async getPostCategories() {
    return await this.publicDataService.findAllPostCategory();
  }

  @setResponse(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY)
  public async getOnePostData(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findPostCategoryById(id);
  }

  @setResponse(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY)
  public async getPositionCategories() {
    return await this.publicDataService.findAllPositionCategory();
  }

  @setResponse(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY)
  public async getPositionCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findPositionCategoryById(id);
  }

  @setResponse(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY)
  public async getProjectCategories() {
    return await this.publicDataService.findAllProjectCategory();
  }

  @setResponse(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY)
  public async getProjectCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findProjectCategoryById(id);
  }

  @setResponse(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY)
  public async getStackCategories() {
    return await this.publicDataService.findAllStackCategory();
  }

  @setResponse(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY)
  public async getStackCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findStackCategoryById(id);
  }

  @setResponse(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ALL_CAREER_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ALL_CAREER_CATEGORY)
  public async getCareerCategories() {
    return await this.publicDataService.findAllCareerCategory();
  }

  @setResponse(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ONE_CAREER_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ONE_CAREER_CATEGORY)
  public async getCareerCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findCareerCategoryById(id);
  }
}
