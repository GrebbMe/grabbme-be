import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GithubGuard } from './guards/github.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { Payload } from './types/jwt.type';
import { GithubUser } from './types/user.type';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(GithubGuard)
  private async gituhbLogin() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  private async githubLoginCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginUser = await this.authService.login(req.user as GithubUser);
    const clientBaseUrl = this.configService.get<string>('network.CLIENT_MAIN_URL');
    const clientSignupUrl = this.configService.get<string>('network.CLIENT_SIGNUP_URL');

    if (loginUser.isExist === false) {
      res.redirect(301, `${clientSignupUrl}?email=${loginUser.email}&nickname=${loginUser.name}`);

      return;
    } else {
      res.cookie('accessToken', loginUser.access_token, { httpOnly: true, path: '/' });
      res.cookie('refreshToken', loginUser.refresh_token, { httpOnly: true, path: '/' });
      res.redirect(301, clientBaseUrl);
      return;
    }
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const {
      access_token: accessToken,
      httpOnly,
      path,
    } = await this.authService.generateAccessToken(req.user as Payload);
    res.cookie('accessToken', accessToken, { httpOnly, path });

    return;
  }
}
