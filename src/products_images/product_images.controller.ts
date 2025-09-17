import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ProdcutImagesService } from "./product_images.service";
import { CreateProductImageDto } from "./dto/create-product_images.dto";
import { extname } from "path";
import { UpdateProductImageDto } from "./dto/update-product_images.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('product-images')
export class ProductImagesController { 
    constructor(private readonly productImageService: ProdcutImagesService){}
    @Post()
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads/productImages', 
            filename: (req, file, callback) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueName}${ext}`);
            }
        }),

        fileFilter: (req, file, callback) => {
            callback(null, true);
        },
    }))

    async create(
        @Body() createProdcutImageDto: CreateProductImageDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({maxSize: 5*1024*1024})],
                fileIsRequired: true,
            }),
        ) images: Express.Multer.File[],
    ) {
        return this.productImageService.create(createProdcutImageDto, images);
    }


    @Get()
    async getAll(
    @Query('page') page?: number, 
    @Query('limit') limit?: number,
    @Query('productId') productId?: number, 
    @Query('isPrimary') isPrimary?: boolean,

    ) {
        return this.productImageService.getAll(page, limit, productId, isPrimary);
    }


    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.productImageService.getOne(id);
    }

    @Get('product/:productId')
    async getByProductId(@Param('productId') productId: number) {
        return this.productImageService.getByProductId(productId);
    }


    @Patch(':id')
    async update(
        @Body() updateProductImageDto: UpdateProductImageDto,
        @Param('id') id: number) {
           return this.productImageService.update(id, updateProductImageDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productImageService.remove(id);
    }
}
