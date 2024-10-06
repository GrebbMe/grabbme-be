import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from './dto/req.dto';
import { User } from './entities/user.entity';
@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '신규 사용자 추가' })
  @ApiCreatedResponse({
    description: '신규 사용자 추가',
    type: User,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiBody({
    description: '신규 사용자 정보',
    type: CreateUserDto,
  })
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  public async getUser(@Param() { id }: GetUserDto) {
    return this.userService.getUser(id);
  }
}
