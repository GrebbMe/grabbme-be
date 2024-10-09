import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from '../types/jwt.type';

// * Refresh Token 검증 및 유저 정보 반환
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  public constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies.refreshToken ?? req.headers['x-refresh-token'],
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  public async validate(payload: Payload) {
    const user = await this.authService.validateUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.');
    }

    return user;
  }
}
