import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { SetResponse } from '@shared/decorator/set-response.decorator';
import { LoggingInterceptor } from '@shared/interceptor/message-logging.interceptor';
import { TransformInterceptor } from '@shared/interceptor/transform.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req.dto';

@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SetResponse(MESSAGE.USER.CREATE_USER.cmd, HttpStatus.CREATED)
  @MessagePattern(MESSAGE.USER.CREATE_USER)
  private async createUser(@Payload() createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @SetResponse(MESSAGE.USER.FIND_USER_BY_EMAIL.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.FIND_USER_BY_EMAIL)
  public async findUserByEmail(@Payload() { email }: { email: string }) {
    return await this.userService.findUserByEmail(email);
  }

  @SetResponse(MESSAGE.USER.LOGIN_OR_CREATE_USER.cmd, HttpStatus.OK)
  @MessagePattern(MESSAGE.USER.LOGIN_OR_CREATE_USER)
  public async createOrLoginUser(
    @Payload() { email, nickname }: { email: string; nickname: string },
  ) {
    return await this.userService.loginOrCreateUser(email, nickname);
  }
}
