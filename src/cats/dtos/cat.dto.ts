import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    @IsString()
    public name: string;

    @IsInt()
    public age: number;

    @IsString()
    public breed: string;
}

export class UpdateCatDto {
    @IsString()
    public name: string;

    @IsInt()
    public age: number;

    @IsString()
    public breed: string;
}

export class ListAllEntities {
    @IsInt()
    public limit: number;
}