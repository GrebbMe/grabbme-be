import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';

@Injectable()
export class PublicDataService {
  public constructor(
    @Inject('PUBLIC_DATA_SERVICE') private readonly publicDataClient: ClientProxy,
  ) {}

  public async getAllPostCategory() {
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
}
