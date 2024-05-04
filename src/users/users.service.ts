import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('BROKER')
    private readonly broker: ClientProxy,
  ) {}

  async create(user: Partial<User>) {
    const createdUser = await this.usersRepository.save(
      new User(user),
    );
    this.broker.emit('user_created', createdUser);

    return createdUser;
  }
}
