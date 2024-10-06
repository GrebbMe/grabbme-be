import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from './dto/req.dto';

@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @MessagePattern(MESSAGE.USER.CREATE_USER)
  private async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @MessagePattern(MESSAGE.USER.GET_USER)
  private async getUser(@Payload() getUserDto: GetUserDto) {
    return await this.userService.getUser(getUserDto.id);
  }
}
