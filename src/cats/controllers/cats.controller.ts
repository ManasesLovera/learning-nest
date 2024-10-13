import { Controller, Get, Header, HttpCode, 
    Param, Post, Query, Redirect, Req, Body,
    Put, Delete, Res, HttpStatus, UseFilters, 
    ParseIntPipe} 
    from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from '../dtos/cat.dto';
import { CatsService } from '../services/cats.service';
import { Cat } from '../interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/exception-filters/http-exception.filter';

@Controller('cats')
export class CatsController {

    constructor(private _catsService: CatsService) {}

    @Post()
    create(@Res() res: Response, @Body() createCatDto: CreateCatDto): Response<any, Record<string, any>> {
        
        this._catsService.create(createCatDto);
        return res.status(HttpStatus.CREATED).json({ message: 'Cat created successfully'});
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response, @Query() query: ListAllEntities) : Response<any, Record<string, any>> {
        return res.status(HttpStatus.OK).json(this._catsService.findAll());
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        
        const cat: Cat | undefined = this._catsService.findById(id);

        return cat !== undefined 
            ? res.status(HttpStatus.OK).json(cat)
            : res.status(HttpStatus.NOT_FOUND).json( {message: 'Not found'} );
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
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