import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GithubGuard } from './guards/github.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtPayload } from './types/jwt.type';
import { GithubUser } from './types/user.type';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(GithubGuard)
  private async githubLogin() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  private async githubLoginCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginUser = await this.authService.login({ ...req.user } as GithubUser);
    const clientBaseUrl = new URL(this.configService.get<string>('network.CLIENT_MAIN_URL'));
    const clientSignupUrl = new URL(this.configService.get<string>('network.CLIENT_SIGNUP_URL'));

    if (loginUser.isExist === false) {
      clientSignupUrl.searchParams.append('email', loginUser.email);
      clientSignupUrl.searchParams.append('nickname', loginUser.name);

      return res.redirect(301, clientSignupUrl.toString());
    } else {
      res.cookie('accessToken', loginUser.access_token, {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: false,
      });
      res.cookie('refreshToken', loginUser.refresh_token, {
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: false,
      });

      return res.redirect(301, clientBaseUrl.toString());
    }
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  public async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const {
      access_token: accessToken,
      httpOnly,
      path,
    } = await this.authService.generateAccessToken(req.user as JwtPayload);

    return res.cookie('accessToken', accessToken, { httpOnly, path });
  }
}
