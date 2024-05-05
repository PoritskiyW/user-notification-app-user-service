import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('BROKER')
    private readonly broker: ClientProxy,
    private readonly logger: Logger
  ) {}

  async create(user: Partial<User>) {
    const createdUser = await this.usersRepository.save(new User(user));
    this.logger.log('User created', JSON.stringify(user));
    this.broker.emit('user_created', createdUser);
    return createdUser;
  }
}
