import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetOnePostCategoryDataDto {
  @IsNumber()
  @ApiProperty({ description: 'post_category ID' })
  public id: number;
}
