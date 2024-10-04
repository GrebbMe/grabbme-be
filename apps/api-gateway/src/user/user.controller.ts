import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/req.dto';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User API')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('github-info')
  public async getGithubInfo(@Query('code') code: string, @Res() res: Response) {
    // return this.usersService.getGithubInfo(code);
    const { data } = await this.userService.getGithubInfo(code);
    const { email, githubId, name } = data;

    res.cookie('githubId', githubId, { httpOnly: true });
    res.cookie('name', name, { httpOnly: true });
    res.cookie('email', email, { httpOnly: true });

    const redirectUrl = `http://localhost:5173`;
    return res.redirect(redirectUrl);

    return await this.userService.getGithubInfo(code);
  }

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
}
