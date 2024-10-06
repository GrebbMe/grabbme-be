import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { CreateUserDto, UpdateUserDto } from './dto/req.dto';

@Injectable()
export class UserService {
  public constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.userClient.send(MESSAGE.USER.CREATE_USER, { ...createUserDto });
  }

  public async getUser(id: number) {
    return await this.userClient.send(MESSAGE.USER.GET_USER, { id });
  }

  public async deleteUser(id: number) {
    return await this.userClient.send(MESSAGE.USER.DELETE_USER, { id });
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.userClient.send(MESSAGE.USER.UPDATE_USER, { id, ...updateUserDto });
  }
}
