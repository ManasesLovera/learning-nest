import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { AllExceptionsFilter } from './common/exception-filters/all-exception.filer';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // middleware for logger
  app.use(logger);
  // Global middleware for exception filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => {
    console.log(`listening on port 3000`);
  });
}
bootstrap();
