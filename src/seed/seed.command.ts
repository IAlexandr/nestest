import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';

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

  constructor() {
    super();
    this.logger = new Logger('commands');
  }

  async run(
    passedParam: string[],
    options?: SeedCommandOptions,
  ): Promise<void> {
    const count = options?.count || 10;

    this.seed(count);
  }

  @Option({
    flags: '-x, -c, --count [number]',
    description: 'A number of random documents',
  })
  parseCount(val: string): number {
    return Number(val);
  }

  seed(count: number): void {
    this.logger.log(`seed count: ${count}`);
    // TODO seed mongoose
  }
}
