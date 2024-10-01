import { CareerCategory, PositionCategory, ProjectCategory } from '@publicData/entities';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsArray()
  @IsNumber({}, { each: true })
  public stack_category_id: number[];

  @IsNumber()
  public position_category_id: PositionCategory;

  @IsNumber()
  public project_category_id: ProjectCategory;

  @IsNumber()
  public career_category_id: CareerCategory;
}
