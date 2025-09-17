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
    UseGuards
} from '@nestjs/common';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller ('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private readonly productService: ProductService){};

    @Post()
    
    async create(@Body() createProductDto: CreateProductDto ){
        return this.productService.create(createProductDto)
    };


    @Get()
    async getAll(){
        return this.productService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id:number): Promise<Product> {
        return this.productService.getOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() UpdateProductDto:UpdateProductDto):Promise<Product | null>{
        return this.productService.update(id, UpdateProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void>{
        await this.productService.remove(id);
    }



}