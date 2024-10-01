import { CreateUserDto } from '@apps/user/src/user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '신규 사용자 추가' })
  @ApiCreatedResponse({
    description: '신규 사용자 추가',
  })
  public async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
}
