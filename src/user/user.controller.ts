import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<User[]> {
    return this.userService.findAll({ take: limit, skip: offset });
  }

  @Get(':name')
  findOneByName(
    @Param('name')
    name: string,
  ): Promise<User> {
    return this.userService.findOneByName(name);
  }
}
