import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Post('create')
  async createUser(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
    },
  ) {
    return this.userService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }
}
