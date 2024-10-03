import { Controller, Get, Header, HttpCode, 
    Param, Post, Query, Redirect, Req, Body,
    Put, Delete, Res, HttpStatus } 
    from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from '../dtos/cat.dto';
import { CatsService } from '../services/cats.service';
import { Cat } from '../interfaces/cat.interface';

@Controller('cats')
export class CatsController {

    constructor(private _catsService: CatsService) {}

    @Post()
    @HttpCode(201)
    create(@Res() res: Response, @Body() createCatDto: CreateCatDto): Response<any, Record<string, any>> {
        
        this._catsService.create(createCatDto);
        return res.status(HttpStatus.CREATED).json({ message: 'Cat created successfully'});
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response, @Query() query: ListAllEntities) : Response<any, Record<string, any>> {
        return res.status(HttpStatus.OK).json(this._catsService.findAll());
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {

        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid id, must be a number'});
        }
        
        const cat: Cat | undefined = this._catsService.findById(idNumber);

        if (cat === undefined) {
            return res.status(HttpStatus.NOT_FOUND).json( {message: 'Not found'} );
        }

        return res.status(HttpStatus.OK).json(cat);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version: string) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}