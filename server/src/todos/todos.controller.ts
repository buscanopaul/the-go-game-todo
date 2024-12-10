import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    // Extract userId from JWT payload
    return this.todosService.create(createTodoDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const todo = await this.todosService.findOne(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    const updatedTodo = await this.todosService.update(
      id,
      updateTodoDto,
      req.user.userId,
    );
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deletedTodo = await this.todosService.remove(id, req.user.userId);
    if (!deletedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return { messages: 'Todo deleted successfully' };
  }
}
