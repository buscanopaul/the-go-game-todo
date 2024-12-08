import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(
    @InjectRepository(Todo)
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  @Get()
  findAll(@Req() req) {
    return this.todosRepository.find({
      where: { userId: req.userId },
      order: { createdAt: 'DESC' },
    });
  }

  @Post()
  create(@Req() req, @Body() todo: Partial<Todo>) {
    return this.todosRepository.save({
      ...todo,
      userId: req.userId,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() todo: Partial<Todo>,
    @Req() req,
  ) {
    await this.todosRepository.update({ id, userId: req.userId }, todo);
    return this.todosRepository.findOne({ where: { id } });
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    await this.todosRepository.delete({ id, userId: req.userId });
    return { success: true };
  }
}
