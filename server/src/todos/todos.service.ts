import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      user: { id: userId }, // Just pass the user id
    });
    return this.todosRepository.save(todo);
  }

  findAll(userId: number) {
    return this.todosRepository.find({
      where: { user: { id: userId } },
    });
  }
}
