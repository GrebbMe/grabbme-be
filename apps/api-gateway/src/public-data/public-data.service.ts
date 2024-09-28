import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';

@Injectable()
export class PublicDataService {
  public constructor(
    @Inject('PUBLIC_DATA_SERVICE') private readonly publicDataClient: ClientProxy,
  ) {}

  public async getPostCategories() {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ALL_POST_CATEGORY,
      {},
    );
  }

  public async getPostCategoryById(id: number) {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.POST_CATEGORY.GET_ONE_POST_CATEGORY,
      { id },
    );
  }

  public async getPositionCategories() {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ALL_POSITION_CATEGORY,
      {},
    );
  }

  public async getPositionCategoryById(id: number) {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.POSITION_CATEGORY.GET_ONE_POSITION_CATEGORY,
      { id },
    );
  }

  public async getProjectCategories() {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ALL_PROJECT_CATEGORY,
      {},
    );
  }

  public async getProjectCategoryById(id: number) {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.PROJECT_CATEGORY.GET_ONE_PROJECT_CATEGORY,
      { id },
    );
  }

  public async getStackCategories() {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ALL_STACK_CATEGORY,
      {},
    );
  }

  public async getStackCategoryById(id: number) {
    return await this.publicDataClient.send(
      MESSAGE.PUBLIC_DATA.STACK_CATEGORY.GET_ONE_STACK_CATEGORY,
      { id },
    );
  }
}
