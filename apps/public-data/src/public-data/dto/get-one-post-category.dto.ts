import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetOnePostCategoryDto {
  @IsInt()
  @ApiProperty({ description: 'post_category ID' })
  public id: number;
}
