import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMaxSize,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  @IsArray()
  @ArrayMaxSize(5)
  @IsNumber({}, { each: true })
  @IsOptional({ always: true })
  public stack_category_id: number[];

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional({ always: true })
  public position_category_id: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional({ always: true })
  public project_category_id: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsOptional({ always: true })
  public career_category_id: number;
}
