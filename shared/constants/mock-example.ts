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
