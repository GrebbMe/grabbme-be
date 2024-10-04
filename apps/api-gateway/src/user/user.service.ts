import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from '@shared/constants/message-pattern';
import { CustomRes } from '@shared/filter/custom-res';
import axios, { AxiosResponse } from 'axios';
import { CreateUserDto } from './dto/req.dto';

interface GithubClient {
  client_id: string;
  client_secret: string;
  callback_url?: string;
}

export interface GithubUser {
  githubId: string;
  avatar: string;
  name: string;
  description: string;
  location: string;
  email: string;
}

@Injectable()
export class UserService {
  public constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  public async getGithubInfo(code: string): Promise<CustomRes<GithubUser>> {
    const githubClient: GithubClient = {
      client_id: this.configService.get<string>('github.client_id'),
      client_secret: this.configService.get<string>('github.client_secret'),
    };

    const baseUrl = 'https://github.com/login/oauth/access_token';
    const tokenRequest = {
      code,
      client_id: githubClient.client_id,
      client_secret: githubClient.client_secret,
    };

    const response: AxiosResponse = await axios.post(baseUrl, tokenRequest, {
      headers: {
        accept: 'application/json',
      },
    });

    if (response.data.error) {
      throw new UnauthorizedException('유효하지 않은 코드 입니다.');
    }

    const { access_token: accessToken } = response.data;

    const getUserUrl = 'https://api.github.com/user';

    const { data: userData } = await axios.get(getUserUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const { login, avatar_url: avatarUrl, name, bio, company } = userData;

    const getEmailUrl = 'https://api.github.com/user/emails';

    const { data: emailData } = await axios.get(getEmailUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const githubUser: GithubUser = {
      githubId: login,
      avatar: avatarUrl,
      name,
      description: bio,
      location: company,
      email: emailData[0].email,
    };

    return {
      status: HttpStatus.OK,
      data: githubUser,
      message: 'github 로그인 성공',
    };
  }
  public async createUser(createUserDto: CreateUserDto) {
    return await this.userClient.send(MESSAGE.USER.CREATE_USER, { ...createUserDto });
  }
}
