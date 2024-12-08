import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const payload = { userId: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
