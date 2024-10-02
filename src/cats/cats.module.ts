import { Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';

@Module({
    controllers: [CatsController],
    providers: [],
})

export class CatsModule {};