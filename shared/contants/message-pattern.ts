interface MessagePattern {
  cmd: string;
}

export class PostCategoryMessagePattern {
  public static readonly GET_POST_DATA: MessagePattern = { cmd: 'get-post-data' };
  public static readonly GET_ONE_POST_DATA: MessagePattern = { cmd: 'get-one-post-data' };
}
