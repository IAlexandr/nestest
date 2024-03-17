import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedCommand } from './seed.command';
import { LoadTestCommand } from './loadTest.command';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [UserService, SeedCommand, LoadTestCommand],
})
export class CommandsModule {}
