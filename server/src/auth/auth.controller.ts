import {
  Body,
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './auth.entity';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const { email, password } = loginDto;

      // Check if user exists
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Check if password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Generate JWT token
      const payload = { userId: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      // Set the JWT token as a cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000, // 1 hour
      });

      return res.json({ message: 'Login successful', accessToken });
    } catch (error) {
      // Catch any unexpected errors and return a proper response
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
