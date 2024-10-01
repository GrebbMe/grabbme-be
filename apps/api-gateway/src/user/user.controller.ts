import { CreateUserDto } from '@apps/user/src/user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '신규 사용자 추가' })
  @ApiCreatedResponse({
    description: '신규 사용자 추가',
  })
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
