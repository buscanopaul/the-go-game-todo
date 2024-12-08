import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

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
}
