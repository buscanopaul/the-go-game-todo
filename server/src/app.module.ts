import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get(process.env.DATABASE_URL),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User], // Add entity explicitly
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    UsersModule, // Import UsersModule here
  ],
})
export class AppModule {}
