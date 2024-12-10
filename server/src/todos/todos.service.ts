import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      userId,
    });
    return this.todosRepository.save(todo);
  }

  async findAll(userId: number): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number): Promise<Todo> {
    return this.todosRepository.findOne({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<Todo> {
    // First check if the todo exists and belongs to the user
    const todo = await this.todosRepository.findOne({
      where: { id },
    });

    if (!todo) {
      return null;
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException('You can only update your own todos');
    }

    // Update the todo
    await this.todosRepository.update(id, {
      ...updateTodoDto,
      updatedAt: new Date(),
    });

    // Return the updated todo
    return this.todosRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number, userId: number): Promise<Todo> {
    // First check if the todo exists and belongs to the user
    const todo = await this.todosRepository.findOne({
      where: { id },
    });

    if (!todo) {
      return null;
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException('You can only delete your own todos');
    }

    // Delete the todo
    await this.todosRepository.delete(id);
    return todo;
  }
}
