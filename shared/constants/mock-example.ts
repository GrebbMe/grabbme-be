import { ChatList } from '@apps/chat/src/chat/entities/chat-list.entity';
import { ChatRoom } from '@apps/chat/src/chat/entities/chat-room.entity';
import { Chat } from '@apps/chat/src/chat/entities/chat.entity';

export const publicDataExamples = {
  postCategory: [
    {
      id: 1,
      post_category_name: '팀원 모집',
    },
    {
      id: 2,
      post_category_name: '인재 등록',
    },
  ],
  positionCategory: [
    {
      position_category_id: 1,
      name: 'Frontend Developer',
      kor_name: '프론트엔드 개발자',
      abbreviation: 'FE',
    },
    {
      position_category_id: 2,
      name: 'Backend Developer',
      kor_name: '백엔드 개발자',
      abbreviation: 'BE',
    },
  ],
  projectCategory: [
    {
      project_category_id: 1,
      name: 'E-commerce',
      kor_name: '이커머스',
      description: '온라인 상에서 상품이나 서비스를 판매하는 플랫폼',
    },
    {
      project_category_id: 2,
      name: 'B2B',
      kor_name: 'B2B',
      description: '기업 간의 거래를 위한 플랫폼',
    },
  ],
  stackCategory: [
    { stack_category_id: 1, name: 'React', kor_name: '리액트', category: 'Frontend' },
    { stack_category_id: 2, name: 'NestJS', kor_name: '네스트JS', category: 'Backend' },
  ],
  careerCategory: [
    { career_category_id: 1, content: '0년차' },
    { career_category_id: 2, content: '1~3년차' },
  ],
} as const;

export const chatExamples = {
  lastChatRoom: {
    channel_id: 1,
    name: 'last',
    users: [],
    chat_lists: [],
  } as ChatRoom,

  newChatRoom: {
    channel_id: 2,
    name: 'test',
    users: [],
    chat_lists: [],
  } as ChatRoom,

  chatRooms: [
    {
      channel_id: 1,
      name: '101번과 102번의 채팅방',
      users: [101, 102],
      chat_lists: [
        {
          chat_list_id: 1,
          chats: [
            {
              chat_id: 1,
              sender_id: 101,
              type: 'text',
              content: '102번에게 보낸 메시지',
              created_at: new Date(),
            },
            {
              chat_id: 2,
              sender_id: 102,
              type: 'text',
              content: '101번에게 보낸 메시지',
              created_at: new Date(),
            },
          ],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      last_chat: '101번에게 보낸 메시지',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ] as ChatRoom[],

  chatLists: [
    {
      chat_list_id: 1,
      chats: [
        {
          chat_id: 1,
          sender_id: 101,
          type: 'text',
          content: '102번에게 보낸 메시지',
          created_at: new Date(),
        },
        {
          chat_id: 2,
          sender_id: 102,
          type: 'text',
          content: '101번에게 보낸 메시지',
          created_at: new Date(),
        },
      ],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ] as ChatList[],

  chats: [
    {
      chat_id: 1,
      sender_id: 101,
      type: 'text',
      content: '102번에게 보낸 메시지',
      created_at: new Date(),
    },
    {
      chat_id: 2,
      sender_id: 102,
      type: 'text',
      content: '101번에게 보낸 메시지',
      created_at: new Date(),
    },
  ] as Chat[],
} as const;
