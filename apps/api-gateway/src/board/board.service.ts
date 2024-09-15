import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BoardService {
  public constructor(
    @Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy,
  ) {}
}
