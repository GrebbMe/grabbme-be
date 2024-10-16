import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      // * access token 유효 확인
      return (await super.canActivate(context)) as boolean;
    } catch {
      // * access token 유효하지 않을 경우 refresh token 확인
      const cookies = request.cookies || {};
      const refreshToken = cookies.refreshToken;
      if (refreshToken) {
        const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

        if (newAccessToken) {
          response.cookie('accessToken', newAccessToken.access_token, {
            httpOnly: true,
            path: '/',
            secure: false,
            sameSite: 'none',
          });

          return true;
        }
      }

      throw new UnauthorizedException('재로그인이 필요합니다.');
    }
  }
}
