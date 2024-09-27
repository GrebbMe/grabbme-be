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
}
