import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { CreateUserDto } from './dto/req.dto';

@Injectable()
export class UserService {
  public constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.userClient.send(MESSAGE.USER.CREATE_USER, { ...createUserDto });
  }
}
