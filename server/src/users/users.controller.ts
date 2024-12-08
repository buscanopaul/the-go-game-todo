import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() userData: User): Promise<User> {
    // Hash the password before saving
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
