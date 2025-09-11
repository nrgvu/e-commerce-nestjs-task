import {
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Delete, 
    Put, 
    Patch,
    Query,
    HttpCode,
    HttpStatus
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController{
    constructor(private readonly userService: UserService){}

    @Post()
    async create( @Body() createUserDto: CreateUserDto){    
        return this.userService.create(createUserDto);
    };

    @Get()
    async getAll(@Query() queryUserDto: QueryUserDto):Promise<User[]>{
        return this.userService.getAll(queryUserDto);
    };

    @Get(':id')
    async getOne(@Param('id') id: number):Promise<User | null>{
        return this.userService.getOne(id);
    };

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateUserDto: UpdateUserDto):Promise<User>{
        return this.userService.update(id, updateUserDto);
    };

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // this is for best practice 
    async remove(@Param('id') id:number):Promise<void>{
        await this.userService.remove(id);
    }


}



    //* always use promises for best practices 

    /*
    todo create()
    todo getAll()
    todo  getOne()
    todo update()
    todo remove()
    
    */