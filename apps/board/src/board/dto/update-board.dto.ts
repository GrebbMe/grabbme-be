import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDate } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  public id: number;

  @IsString()
  public title?: string;

  @IsString()
  public content?: string;

  @IsDate()
  public expired_at?: Date;

  // @IsString()
  // public project_category?: string;

  // @IsString()
  // public stack_category?: string;

  // @IsString()
  // public teams?: string;
}
