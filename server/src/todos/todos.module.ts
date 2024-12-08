import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { UsersModule } from '../users/users.module'; // Add this

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UsersModule, // Add this
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
