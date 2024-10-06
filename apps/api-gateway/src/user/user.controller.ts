import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, DeleteUserDto } from './dto/req.dto';
import { User } from './entities/user.entity';
@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '신규 사용자 추가' })
  @ApiCreatedResponse({
    description: '사용자가 추가되었습니다.',
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

  @ApiOperation({ summary: '사용자 조회' })
  @ApiResponse({ description: '사용자가 조회되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user_id',
  })
  @Get()
  public async getUser(@Param() { id }: GetUserDto) {
    return await this.userService.getUser(id);
  }

  @ApiOperation({ summary: '사용자 계정 삭제' })
  @ApiResponse({ description: '사용자 계정이 성공적으로 삭제되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user_id',
  })
  @Delete()
  public async deleteUser(@Param() { id }: DeleteUserDto) {
    return await this.userService.deleteUser(id);
  }
}
