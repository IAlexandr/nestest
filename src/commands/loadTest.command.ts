import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';

interface LoadTestCommandOptions {
  index?: boolean;
}

@Command({
  name: 'load-test',
  description: 'Load testing',
  options: {
    isDefault: false,
  },
})
export class LoadTestCommand extends CommandRunner {
  private logger: Logger;

  constructor() {
    super();
    this.logger = new Logger('commands');
  }

  async run(
    passedParam: string[],
    options?: LoadTestCommandOptions,
  ): Promise<void> {
    this.loadTest(!!options?.index);
  }

  @Option({
    flags: '--index',
    description: 'Use index',
  })
  useIndex(): boolean {
    return true;
  }

  loadTest(useIndex: boolean): void {
    this.logger.log(`load test (useIndex: ${useIndex})`);
    // TODO seed mongoose
  }
}
