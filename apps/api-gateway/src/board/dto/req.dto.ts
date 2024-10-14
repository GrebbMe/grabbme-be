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
  ValidateNested,
} from 'class-validator';
export class CreateTeamDto {
  @IsNumber()
  public position_category_id: number;

  @IsNumber()
  public total_cnt: number;
}

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public start_month?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public end_month?: string;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  @IsOptional()
  public teamsData?: { position_category_id: number; total_cnt: number }[];
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
