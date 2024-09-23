import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public expired_at: Date;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   public project_category_id: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   public stack_category_id: number;

  //   @IsNumber()
  //   @IsNotEmpty()
  //   public teams: number;
}
