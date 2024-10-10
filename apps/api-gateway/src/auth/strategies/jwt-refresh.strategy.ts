import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../types/jwt.type';

// * Refresh Token 검증 및 유저 정보 반환
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  public constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies.refreshToken,
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  public async validate(payload: JwtPayload) {
    const user = await this.userService.findUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.');
    }

    return user;
  }
}
