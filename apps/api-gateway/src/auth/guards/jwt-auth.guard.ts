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
      const canActivate = await super.canActivate(context);
      console.log('canActivate', canActivate);

      // * access token 유효 확인
      return canActivate as boolean;
    } catch (err) {
      // * access token 유효하지 않을 경우 refresh token 확인
      const cookies = request.cookies || {};
      const refreshToken = cookies.refreshToken ?? (request.headers['x-refresh-token'] as string);
      if (refreshToken) {
        const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

        console.log('새로운 accessToken', newAccessToken.access_token);

        if (newAccessToken) {
          response.cookie('accessToken', newAccessToken.access_token, {
            httpOnly: true,
            path: '/',
          });

          return true;
        }
      }

      throw new UnauthorizedException('재로그인이 필요합니다.');
    }
  }
}
