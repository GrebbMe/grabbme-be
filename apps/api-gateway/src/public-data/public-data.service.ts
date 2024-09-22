import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { publicDataMessages } from '@shared/constants/message-pattern';

@Injectable()
export class PublicDataService {
  public constructor(
    @Inject('PUBLIC_DATA_SERVICE') private readonly publicDataClient: ClientProxy,
  ) {}

  public async getPostCategories() {
    return await this.publicDataClient.send(
      publicDataMessages.POST_CATEGORY.GET_ALL_POST_CATEGORY,
      {},
    );
  }

  public async getPostCategoryById(id: number) {
    return await this.publicDataClient.send(
      publicDataMessages.POST_CATEGORY.GET_ONE_POST_CATEGORY,
      { id },
    );
  }
}
