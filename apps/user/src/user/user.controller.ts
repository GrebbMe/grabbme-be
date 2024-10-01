import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @MessagePattern(MESSAGE.USER.CREATE_USER)
  private async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }
}
