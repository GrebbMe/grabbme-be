import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}
}
