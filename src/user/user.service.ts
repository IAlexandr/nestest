import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertManyResult, MongoRepository } from 'typeorm';
import { User } from './user.entity';

const USER_NAME_INDEX = 'name_1';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll({
    take = 10,
    skip = 0,
  }: {
    take: number;
    skip: number;
  }): Promise<User[]> {
    return this.userRepository.find({ take, skip });
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

  async createIndex(): Promise<string> {
    return this.userRepository.createCollectionIndex('name');
  }

  async dropIndex(): Promise<void> {
    const indexes = await this.userRepository.collectionIndexInformation();
    if (indexes.hasOwnProperty(USER_NAME_INDEX))
      await this.userRepository.dropCollectionIndex(USER_NAME_INDEX);
  }
}
