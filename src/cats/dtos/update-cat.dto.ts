import { IsString, IsInt } from 'class-validator';

export default class UpdateCatDto {
    @IsString()
    public name: string;

    @IsInt()
    public age: number;

    @IsString()
    public breed: string;
}