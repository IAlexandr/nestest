import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':name')
  findOneByName(
    @Param('name')
    name: string,
  ): Promise<User> {
    return this.userService.findOneByName(name);
  }
}
