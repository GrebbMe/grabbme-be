import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostCategoryMessagePattern } from '@shared/constants/message-pattern';

@Injectable()
export class PublicDataService {
  public constructor(
    @Inject('PUBLIC_DATA_SERVICE') private readonly publicDataClient: ClientProxy,
  ) {}

  public async getPostCategories() {
    return await this.publicDataClient.send(PostCategoryMessagePattern.GET_POST_DATA, {});
  }

  public async getPostCategoryById(id: number) {
    const pattern = PostCategoryMessagePattern.GET_ONE_POST_DATA;
    const payload = { id };
    return this.publicDataClient.send(pattern, payload);
  }
}
