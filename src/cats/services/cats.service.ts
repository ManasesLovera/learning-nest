import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dtos/create-cat.dto';

@Injectable()
export class CatsService {

    private readonly cats: Cat[] = [];

    public create(catDto: CreateCatDto) {

        let catId = 1;
        if (this.cats.length > 0) {
            const lastCat: Cat = this.cats[this.cats.length - 1];
            catId = lastCat.id + 1;
        }
        const cat: Cat = {
            id: catId,
            name: catDto.name,
            age: catDto.age,
            breed: catDto.breed
        }
        this.cats.push(cat);
    }

    public findAll(): Cat[] {
        return this.cats;
    }

    public findById(id: number): Cat | undefined {
        return this.cats.find(cat => cat.id === id);
    }

    public remove(id: number): boolean {
        const cat: Cat | undefined = this.cats.find(c => c.id === id);
        if (cat === undefined)
            return false;
        else {
            this.cats.splice(this.cats.indexOf(cat), 1);
            return true;
        }
    }
}