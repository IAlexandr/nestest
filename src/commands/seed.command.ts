import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

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
    // TODO
    const r = await this.userService.addUser({ name: 'test' });
    this.logger.log(r);
  }
}
