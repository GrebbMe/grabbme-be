import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from '../types/jwt.type';

// * Access Token 검증 및 유저 정보 반환
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies.accessToken ?? req.headers.authorization,
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  public async validate(payload: Payload) {
    console.log('accessToken Strategy', payload);
    const user = await this.authService.validateUser(payload.email);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자입니다.');
    }

    return user;
  }
}
