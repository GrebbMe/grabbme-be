import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { UserService } from './user.service';
import { CreateUserDto, ParamIdDto, UpdateUserDto } from './dto/req.dto';

@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SetResponse(MESSAGE.USER.CREATE_USER.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.USER.CREATE_USER)
  private async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @SetResponse(MESSAGE.USER.GET_USER.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.GET_USER)
  private async getUser(@Payload() { id }: ParamIdDto) {
    return await this.userService.getUser(id);
  }

  @SetResponse(MESSAGE.USER.DELETE_USER.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.DELETE_USER)
  private async deleteUser(@Payload() { id }: ParamIdDto) {
    return await this.userService.deleteUser(id);
  }

  @SetResponse(MESSAGE.USER.UPDATE_USER.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.UPDATE_USER)
  private async updateUser(@Payload() { id }: ParamIdDto, @Payload() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, { ...updateUserDto });
  }
}
