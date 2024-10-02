import { Controller, Get, Header, HttpCode, 
    Param, Post, Query, Redirect, Req, Body,
    Put, Delete, Res, HttpStatus } 
    from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from '../dtos/create-cat.dto'

@Controller('cats')
export class CatsController {

    @Post()
    @HttpCode(201)
    create(@Res() res: Response, @Body() createCatDto: CreateCatDto): Response<any, Record<string, any>> {
        return res.status(HttpStatus.CREATED).send();
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response, @Query() query: ListAllEntities) : Response<any, Record<string, any>> {
        return res.status(HttpStatus.OK).json([]);
    }

    @Get(':id')
    findOne(@Param('id') id: string) : string {
        return `This action return a #${id} cat`;
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