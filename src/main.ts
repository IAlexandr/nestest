const cluster = require('cluster');

import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (false && cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug'],
    });
    await app.listen(3000);
  }
}
bootstrap();
