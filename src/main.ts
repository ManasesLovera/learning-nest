import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global middleware
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000, () => {
    console.log(`listening on port 3000`);
  });
}
bootstrap();
