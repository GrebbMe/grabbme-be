import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { TransformInterceptor } from '@shared/interceptor/transform.interceptor';
import { PublicDataService } from './public-data.service';
import { BasicReqDto } from './dto/req.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class PublicDataController {
  public constructor(private readonly publicDataService: PublicDataService) {}

  @SetResponse(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY)
  public async getPostCategories() {
    return await this.publicDataService.findAllPostCategory();
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY)
  public async getOnePostData(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findPostCategoryById(id);
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY)
  public async getPositionCategories() {
    return await this.publicDataService.findAllPositionCategory();
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY)
  public async getPositionCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findPositionCategoryById(id);
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY)
  public async getProjectCategories() {
    return await this.publicDataService.findAllProjectCategory();
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY)
  public async getProjectCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findProjectCategoryById(id);
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY)
  public async getStackCategories() {
    return await this.publicDataService.findAllStackCategory();
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY)
  public async getStackCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findStackCategoryById(id);
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ALL_CAREER_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ALL_CAREER_CATEGORY)
  public async getCareerCategories() {
    return await this.publicDataService.findAllCareerCategory();
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ONE_CAREER_CATEGORY.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.CAREER_CATEGORY.GET_ONE_CAREER_CATEGORY)
  public async getCareerCategoryById(@Payload() { id }: BasicReqDto) {
    return await this.publicDataService.findCareerCategoryById(id);
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.GRAPH.STACK_GRAPH.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.GRAPH.STACK_GRAPH)
  public async getStackGraph(@Payload() { year, month }: { year: number; month: number }) {
    return await this.publicDataService.getStackGraphs({ year, month });
  }

  @SetResponse(MESSAGE.PUBLIC_DATA.GRAPH.APPLY_GRAPH.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.PUBLIC_DATA.GRAPH.APPLY_GRAPH)
  public async getApplyGraph() {
    return await this.publicDataService.getApplyGraphs();
  }
}
