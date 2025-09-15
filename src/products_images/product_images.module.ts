import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImage } from "./entities/product_images.entity";
import { ProductImagesController } from "./product_images.controller";
import { ProdcutImagesService } from "./product_images.service";
import { ProductModule } from "src/products/product.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductImage]), ProductModule],
    controllers: [ProductImagesController],
    providers: [ProdcutImagesService],
    exports: [ProdcutImagesService]
})

export class ProductImageModule {};