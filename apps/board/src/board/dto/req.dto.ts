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
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public project_category_id: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public stack_category_id: number[];

  @IsNumber()
  @IsOptional()
  public position_category_id?: number;

  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  public expired_at?: Date;
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsNumber()
  public id: number;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public content?: string;

  @IsDate()
  @IsOptional()
  public expired_at?: Date;

  @IsNumber({}, { each: true })
  @IsOptional()
  public project_category_id?: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  public stack_category_id?: number[];

  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @IsNumber()
  @IsOptional()
  public position_category_id?: number;
}
