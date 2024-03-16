import { CommandFactory } from 'nest-commander';
import { SeedModule } from './seed/seed.module';

async function bootstrap() {
  await CommandFactory.run(SeedModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
}
bootstrap();
