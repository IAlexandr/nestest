import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

function generateRandomString() {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}

interface SeedCommandOptions {
  count?: number;
}

@Command({
  name: 'seed',
  description: 'Generate X random documents',
  options: {
    isDefault: false,
  },
})
export class SeedCommand extends CommandRunner {
  private logger: Logger;

  constructor(private userService: UserService) {
    // constructor() {
    super();
    this.logger = new Logger('commands');
  }

  async run(
    passedParam: string[],
    options?: SeedCommandOptions,
  ): Promise<void> {
    const count = options?.count || 10;

    await this.seed(count);
  }

  @Option({
    flags: '--count [number]',
    description: 'A number of random documents',
  })
  parseCount(val: string): number {
    return Number(val);
  }

  async seed(count: number): Promise<void> {
    this.logger.log(`seed count: ${count}`);
    const usersToInsert = [];

    for (let i = 0; i < count; i++) {
      usersToInsert.push({ name: generateRandomString() });
    }
    const r = await this.userService.addBatchUsers(usersToInsert);
    this.logger.log(`seed result insertedCount: ${r.insertedCount}`);
  }
}
