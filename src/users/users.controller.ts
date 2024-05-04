import { Controller } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
} from '@nestjs/microservices';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern('create_user')
  create(@Payload() data: Partial<User>) {
    return this.usersService.create(data);
  }
}
