import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { Todo } from './todos/todo.entity';
import { Session } from './auth/auth.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Todo, Session, User], // Add User entity here
        synchronize: true,
      }),
    }),
    UsersModule, // Register UsersModule
  ],
})
export class AppModule {}
