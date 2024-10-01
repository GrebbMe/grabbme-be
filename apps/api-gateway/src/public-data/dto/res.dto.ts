import { ApiProperty } from '@nestjs/swagger';

export class PostCategoryResDto {
  @ApiProperty({
    example: 1,
    description: 'post category id',
  })
  public id: number;

  @ApiProperty({
    example: '프로젝트',
    description: 'post category name',
  })
  public post_category_name: string;
}

export class PositionCategoryResDto {
  @ApiProperty({
    examples: [1, 2, 3],
    description: 'position category id',
  })
  public position_category_id: number;

  @ApiProperty({
    examples: ['Frontend', 'Backend', 'Fullstack'],
    description: '직군 이름',
  })
  public name: string;

  @ApiProperty({
    examples: ['프론트엔드', '백엔드', '풀스택'],
    description: '직군 한글 이름',
  })
  public kor_name: string;

  @ApiProperty({
    examples: ['FE', 'BE', 'FS'],
    description: '직군 약어',
  })
  public abbreviation: string;
}

export class ProjectCategoryResDto {
  @ApiProperty({
    examples: [1, 2, 3],
    description: 'project category id',
  })
  public project_category_id: number;

  @ApiProperty({
    examples: ['B2B', 'B2C', 'Fintech'],
    description: '도메인 이름',
  })
  public name: string;

  @ApiProperty({
    examples: ['B2B', 'B2C', '핀테크'],
    description: '도메인 한글 이름',
  })
  public kor_name: string;

  @ApiProperty({
    examples: ['기업간', '기업대 소비자', '금융'],
    description: '도메인 설명',
  })
  public description: string;
}

export class StackCategoryResDto {
  @ApiProperty({
    examples: [1, 2, 3],
    description: 'stack category id',
  })
  public stack_category_id: number;

  @ApiProperty({
    examples: ['React', 'Node.js', 'Django'],
    description: '스택 이름',
  })
  public name: string;

  @ApiProperty({
    examples: ['리액트', '노드', '장고'],
    description: '스택 한글 이름',
  })
  public kor_name: string;

  @ApiProperty({
    examples: ['FE', 'BE', 'BE'],
    description: '스택 약어',
  })
  public abbreviation: string;
}

export class CareerCategoryResDto {
  @ApiProperty({
    examples: [1, 2, 3],
    description: 'career category id',
  })
  public career_category_id: number;

  @ApiProperty({
    example: '0년차',
    description: 'career category name',
  })
  public content: string;
}
