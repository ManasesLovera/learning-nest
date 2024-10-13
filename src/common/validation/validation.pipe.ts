import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z, ZodSchema } from 'zod';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
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

@Injectable()
export class ParseIntPipe implements PipeTransform<string,number> {

    transform(value: string, metadata: ArgumentMetadata): number {
        const  val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('Invalid number');
        }
        return val;
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