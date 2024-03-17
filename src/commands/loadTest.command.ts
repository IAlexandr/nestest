const cluster = require('cluster');
import * as os from 'os';

import axios from 'axios';
import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

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

  constructor(private userService: UserService) {
    super();
    this.logger = new Logger('commands');
  }

  async run(
    passedParam: string[],
    options?: LoadTestCommandOptions,
  ): Promise<void> {
    await this.loadTest(!!options?.index);
  }

  @Option({
    flags: '--index',
    description: 'Use index',
  })
  useIndex(): boolean {
    return true;
  }

  async loadTest(useIndex: boolean): Promise<void> {
    this.logger.log(`load test (useIndex: ${useIndex})`);

    if (useIndex) {
      await this.userService.createIndex();
    } else {
      await this.userService.dropIndex();
    }

    if (cluster && cluster.isPrimary) {
      const numCPUs = os.cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('message', (worker, message) => {
        this.logger.log(`${worker.id}: ${message}`);
      });
    } else {
      let successCount = 0;
      let errorCount = 0;
      const users = await this.userService.findAll({
        take: 10000,
        skip: Math.floor(Math.random() * 100000),
      });
      for (const user of users) {
        try {
          await axios.get(`http://localhost:3000/users/${user.name}`);
          successCount++;
          successCount % 1000 === 0 &&
            process.send('successCount: ' + successCount);
        } catch (error) {
          process.send(`Error for ${user.name}: ${error.message}`);
          errorCount++;
        }
      }
      this.logger.log(`successCount: ${successCount}`);
      this.logger.log(`errorCount: ${errorCount}`);
    }
  }
}
