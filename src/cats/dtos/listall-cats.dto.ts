import { IsInt } from "class-validator";


export default class ListAllEntities {
    @IsInt()
    public limit: number;
}