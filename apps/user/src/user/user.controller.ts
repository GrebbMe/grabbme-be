import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from './dto/req.dto';

@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SetResponse(MESSAGE.USER.CREATE_USER.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.USER.CREATE_USER)
  private async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @SetResponse(MESSAGE.USER.CREATE_USER.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.GET_USER)
  private async getUser(@Payload() getUserDto: GetUserDto) {
    return await this.userService.getUser(getUserDto.id);
  }
}
