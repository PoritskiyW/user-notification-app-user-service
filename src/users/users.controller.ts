import { Controller, Logger } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
} from '@nestjs/microservices';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService, private readonly logger: Logger) {}

  @MessagePattern('create_user')
  async create(@Payload() data: Partial<User>) {
    try {
      this.logger.log('Received request for user creation', JSON.stringify(data));
      const createdUser = await this.usersService.create(data);
      this.logger.log('User created successfully', JSON.stringify(createdUser));
      return createdUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw error;
    }
  }
}
