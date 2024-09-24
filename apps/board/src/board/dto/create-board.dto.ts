import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsDate()
  @IsNotEmpty()
  public expired_at: Date;

  // @IsNumber()
  // @IsNotEmpty()
  // public project_category_id: number;

  // @IsNumber()
  // @IsNotEmpty()
  // public stack_category_id: number;

  // @IsString()
  // @IsNotEmpty()
  // public teams: string;
}
