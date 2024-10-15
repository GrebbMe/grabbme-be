import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
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
  @ApiProperty({ description: 'position_category_id 값', required: true })
  public position_category_id: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'position 별 총인원 수', required: false })
  public total_cnt?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'position 지원한 인원 수', required: false })
  public apply_cnt?: number;
}

export class UpdateTeamDto extends CreateTeamDto {
  @ApiProperty({ description: '수정할 팀 id', required: true })
  @IsNumber()
  @IsNotEmpty()
  public team_id: number;
}

export class CreateBoardDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty({ description: '프로젝트 시작 월', required: false })
  @IsString()
  @IsOptional()
  public start_month?: string;

  @ApiProperty({ description: '프로젝트 종료 월', required: false })
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

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  public position_category_id?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  public career_category_id?: number;

  @ApiProperty({ type: 'Date', required: false })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  public expired_at?: Date;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  @ArrayNotEmpty()
  public teamsData: CreateTeamDto[];
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ type: 'array', items: { type: 'object' }, required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTeamDto)
  @IsOptional()
  public teamsData?: UpdateTeamDto[];
}
