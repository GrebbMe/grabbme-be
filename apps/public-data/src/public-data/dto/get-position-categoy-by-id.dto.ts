import { IsInt } from 'class-validator';

export class GetPositionCategoryByIdDto {
  @IsInt()
  public id: number;
}
