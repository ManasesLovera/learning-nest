
export class CreateCatDto {
    public name: string;
    public age: number;
    public breed: string;
}

export class UpdateCatDto {
    public name: string;
    public age: string;
    public breed: string;
}

export class ListAllEntities {
    public limit: number;
}