import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Todo],
        synchronize: true, // set to false in production
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
