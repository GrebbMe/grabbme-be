import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ArrayMaxSize } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsArray()
  @ArrayMaxSize(5)
  @IsNumber({}, { each: true })
  public stack_category_id: number[];

  @IsNumber()
  public position_category_id: PositionCategory;

  @IsNumber()
  public project_category_id: ProjectCategory;

  @IsNumber()
  public career_category_id: CareerCategory;
}
