import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertManyResult, MongoRepository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByName(name: string): Promise<User> {
    return this.userRepository.findOneBy({ name });
  }

  async addUser(user: { name: string }): Promise<User> {
    return this.userRepository.save(user);
  }

  async addBatchUsers(
    users: Array<{ name: string }>,
  ): Promise<InsertManyResult<User>> {
    return this.userRepository.insertMany(users);
  }
}
