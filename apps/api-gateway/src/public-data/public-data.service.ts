import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostCategoryMessagePattern } from '@shared/constants/message-pattern';

@Injectable()
export class PublicDataService {
  public constructor(
    @Inject('PUBLIC_DATA_SERVICE') private readonly publicDataClient: ClientProxy,
  ) {}

  public getPostData() {
    const pattern = PostCategoryMessagePattern.GET_POST_DATA;
    return this.publicDataClient.send(pattern, {});
  }

  public getOnePostData(id: number) {
    const pattern = PostCategoryMessagePattern.GET_ONE_POST_DATA;
    const payload = { id };
    return this.publicDataClient.send(pattern, payload);
  }
}
