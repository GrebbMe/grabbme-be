import { CreateUserDto } from '@apps/user/src/user/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';

@Injectable()
export class UserService {
  public constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  public async createUser(user: CreateUserDto) {
    return await this.userClient.send(MESSAGE.USER.CREATE_USER, { ...user });
  }
}
