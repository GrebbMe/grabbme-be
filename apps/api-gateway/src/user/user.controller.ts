import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

// swagger 적는 곳

@Controller('user')
export class UserController {
  public constructor(private readonly usersService: UserService) {}
}
