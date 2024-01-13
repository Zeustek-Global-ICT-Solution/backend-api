import { UsersService } from './../../users/services/users.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(createAuthDto: CreateAuthDto) {
    return `This action returns all auth`;
  }

  validateUser(createAuthDto: CreateAuthDto) {
    return {};
  }

  profile(id: number) {
    return `This action returns a #${id} auth`;
  }

  resetPassword(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  verify(token: any) {
    return `This action removes a #${token} auth`;
  }
}
