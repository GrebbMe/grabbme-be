export const MESSAGE = {
  PUBLIC_DATA: {
    POST_CATEGORY: {
      GET_ALL_POST_CATEGORY: { cmd: 'get-all-post-category' },
      GET_ONE_POST_CATEGORY: { cmd: 'get-one-post-category' },
    },
  },
  CHAT: {
    CREATE_CHAT_ROOM: { cmd: 'create-chat-room' },
  },
} as const;
