import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z, ZodSchema } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}

export class ZodValidationPipe implements PipeTransform {

    constructor(private schema: ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
          } catch (error) {
            throw new BadRequestException('Validation failed');
          }
    }

}

export const createCatSchema = z
    .object({
        name: z.string(),
        age: z.number(),
        breed: z.string()
    })
    .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;