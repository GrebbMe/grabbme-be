import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/req.dto';

import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

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
    const createdUser = await firstValueFrom(await this.userService.createUser(createUserDto));
    // * 회원가입 성공 시, JWT 토큰 response

    if (createdUser.status === HttpStatus.CREATED) {
      const accessToken = (await this.authService.generateAccessToken(createdUser.data.email))
        .access_token;
      const refreshToken = (await this.authService.generateRefreshToken(createdUser.data.email))
        .refresh_token;

      const clientResponse = {
        accessToken,
        refreshToken,
        url: this.configService.get<string>('network.CLIENT_MAIN_URL'),
      };

      return clientResponse;
    } else {
      throw new UnauthorizedException('회원가입에 실패 했습니다.');
    }
  }

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  public async getUserInfoByEmail(@Query('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @ApiOperation({ summary: '사용자 조회' })
  @ApiResponse({ description: '사용자가 조회되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Get('/:id')
  public async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }

  @ApiOperation({ summary: '사용자 계정 삭제' })
  @ApiResponse({ description: '사용자 계정이 성공적으로 삭제되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
  })
  @Delete('/:id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiResponse({ description: '사용자 정보가 성공적으로 수정되었습니다.' })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
  })
  @ApiBody({
    description: '사용자 정보 수정',
    type: UpdateUserDto,
  })
  @Patch('/:id')
  public async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
