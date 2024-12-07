import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
