import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';

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
      
    }), 
    UsersModule,
    CategoryModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
