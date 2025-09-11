import { Module } from '@nestjs/common'; 
import {TypeOrmModule} from '@nestjs/typeorm';
import { CategoryService } from './category.services';
import { CategoryControllers } from './category.controllers';
import { Category } from './entities/category.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Category])], 
    controllers: [CategoryControllers], 
    providers: [CategoryService]
})

export class CategoryModule {}