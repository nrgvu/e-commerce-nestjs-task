import {
    Controller,
    Post, 
    Get,
    Patch,
    Delete,
    Body, 
    Param, 
    Query,
    HttpCode,
    HttpStatus
} from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.services';


@Controller('categories')
export class CategoryControllers {
    constructor(private readonly categoryService: CategoryService){};

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto ){
        return this.categoryService.create(createCategoryDto)
    };


    @Get()
    async getAll(){
        return this.categoryService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id:number): Promise<Category> {
        return this.categoryService.getOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateCategoryDto:UpdateCategoryDto):Promise<Category>{
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void>{
        await this.categoryService.remove(id);
    }



}