export enum MessagePatternEnum {
  GET_ALL_POST_CATEGORY = 'get-all-post-category',
  GET_ONE_POST_CATEGORY = 'get-one-post-category',
}

export const publicDataMessages = {
  POST_CATEGORY: {
    GET_ALL_POST_CATEGORY: { cmd: MessagePatternEnum.GET_ALL_POST_CATEGORY },
    GET_ONE_POST_CATEGORY: { cmd: MessagePatternEnum.GET_ONE_POST_CATEGORY },
  },
} as const;
