export const MESSAGE = {
  PUBLIC_DATA: {
    POST_CATEGORY: {
      GET_ALL_POST_CATEGORY: { cmd: 'get-all-post-category' },
      GET_ONE_POST_CATEGORY: { cmd: 'get-one-post-category' },
    },
    POST_DATA: {
    POST: {
      GET_ALL_POST: { cmd: 'get-all-post' },
      GET_ONE_POST: { cmd: 'get-one-post' },
      CREATE_POST: { cmd: 'create-post' },
      UPDATE_POST: { cmd: 'update-post' },
      DELETE_POST: { cmd: 'delete-post' },
  },
} as const;
