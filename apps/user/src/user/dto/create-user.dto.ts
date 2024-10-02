import { ApiProperty } from '@nestjs/swagger';
import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ArrayMaxSize } from 'class-validator';

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
  public stack_category_id: number[];

  @ApiProperty({ type: 'number' })
  @IsNumber()
  public position_category_id: PositionCategory;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  public project_category_id: ProjectCategory;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  public career_category_id: CareerCategory;
}
