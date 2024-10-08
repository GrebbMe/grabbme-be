import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsArray()
  @IsNotEmpty()
  public project_category_id: number[];

  @IsNumber()
  @IsOptional()
  public position_category_id?: number;

  @IsArray()
  @IsNotEmpty()
  public stack_category_id: number[];

  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  public expired_at?: Date;
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  public id: number;
}
