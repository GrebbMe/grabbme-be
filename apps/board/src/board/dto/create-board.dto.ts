import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsDate()
  @IsNotEmpty()
  public expired_at: Date;
}
