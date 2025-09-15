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
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator
} from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('categories')
export class CategoryControllers {
    constructor(private readonly categoryService: CategoryService){};

    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: './uploads/categories',
            filename: (req, file, callback) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueName}${ext}`);
                
            }
        }),
    }))
    async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 5 * 1024 * 1024}), 
            ],
            fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
     ){
        return this.categoryService.create(createCategoryDto, image)
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