import { CreateUserDto } from '@apps/api-gateway/src/user/dto/req.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public id: number;
}
