import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { GithubUser } from '../types/user.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  public constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('github.client_id'),
      clientSecret: configService.get('github.client_secret'),
      callbackURL: configService.get('github.callback_url'),
      scope: ['user:email'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, photos, emails } = profile;

    const user: GithubUser = {
      githubId: id,
      name: username,
      avatar: photos[0].value,
      email: emails[0].value,
      accessToken,
    };

    return user;
  }
}
