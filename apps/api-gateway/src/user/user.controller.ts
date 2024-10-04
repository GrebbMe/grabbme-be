import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(private readonly usersService: UserService) {}

  @Get('github-info')
  public async getGithubInfo(@Query('code') code: string, @Res() res: Response) {
    // return this.usersService.getGithubInfo(code);
    const { data } = await this.usersService.getGithubInfo(code);
    const { email, githubId, name } = data;

    res.cookie('githubId', githubId, { httpOnly: true });
    res.cookie('name', name, { httpOnly: true });
    res.cookie('email', email, { httpOnly: true });

    const redirectUrl = `http://localhost:5173`;
    return res.redirect(redirectUrl);

    return await this.usersService.getGithubInfo(code);
  }
}
