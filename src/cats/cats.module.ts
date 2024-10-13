import { Module, ValidationPipe } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
    controllers: [CatsController],
    providers: [
        CatsService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ],
})

export class CatsModule {};