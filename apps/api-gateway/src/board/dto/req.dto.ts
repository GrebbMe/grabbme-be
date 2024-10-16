import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNumber()
  public position_category_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public total_cnt?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public apply_cnt?: number;
}

export class CreateBoardDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

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
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  public project_category_id: number[];

  @ApiProperty({ type: 'array', items: { type: 'number' } })
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

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  @IsNotEmpty({ each: true })
  public teamsData: { position_category_id: number; total_cnt?: number; apply_cnt?: number }[];
}

export class UpdateTeamDto extends CreateTeamDto {
  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  public teamsData: CreateTeamDto[];
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ type: 'array', items: { type: 'object' }, required: false })
  @ValidateNested({ each: true })
  @Type(() => UpdateTeamDto)
  @IsOptional()
  public teamsData?: UpdateTeamDto[];
}

export class CreateParticipantDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public position_category_id: number;
}

export class UpdateParticipantDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public participants_id: number;

  @IsString()
  @IsNotEmpty()
  public status: string;
}
