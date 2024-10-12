import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './req.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public id: number;
}
