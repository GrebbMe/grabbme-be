import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public project_category_id: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @ArrayMaxSize(5)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public stack_category_id: number[];

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional()
  public position_category_id?: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @ApiProperty({ type: 'Date' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  public expired_at?: Date;
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public content?: string;

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsOptional()
  public project_category_id?: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @ArrayMaxSize(5)
  @IsNumber({}, { each: true })
  @IsOptional()
  public stack_category_id?: number[];

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional()
  public position_category_id?: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  public expired_at?: Date;
}
