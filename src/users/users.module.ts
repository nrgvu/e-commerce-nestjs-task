import { Module } from '@nestjs/common'; 
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserService } from './user.services';
import { UsersController } from './user.controllers';
import  {User} from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], 
    controllers: [UsersController], 
    providers: [UserService]
})

export class UsersModule {}