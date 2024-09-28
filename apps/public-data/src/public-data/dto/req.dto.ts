import { IsInt } from 'class-validator';

export class GetProjectCategoryDTO {
  @IsInt()
  public id: number;
}
