import { Module } from '@nestjs/common';

import { TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';
import { ProductModule} from './products/product.module'
import { ProductImageModule } from './products_images/product_images.module';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { ProductImage } from './products_images/entities/product_images.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: '12345678', 
      database: 'e-commerce-nestJS', 
      autoLoadEntities: true, 
      synchronize: true, 
      entities: [User, Category, Product, ProductImage],
      
    }), 
    TypeOrmModule.forFeature([User, Category, Product, ProductImage]),
    UsersModule,
    CategoryModule,
    ProductModule,
    ProductImageModule,
    
  ],

})
export class AppModule {}
