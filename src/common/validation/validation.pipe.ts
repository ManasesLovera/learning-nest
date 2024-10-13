import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidatonPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}