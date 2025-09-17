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
    HttpStatus,
    UseGuards
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
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

    // get By email new method to meet registerService methods
    @Get('by-email')
    async getByEmail(@Body('email') email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateUserDto: UpdateUserDto):Promise<User>{
        return this.userService.update(id, updateUserDto);
    };

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // this is for best practice 
    async remove(@Param('id') id:number):Promise<void>{
        await this.userService.remove(id);
    }   



@Patch(':id/password')
async updatePassword(
  @Param('id') id: number,
  @Body('currentPassword') currentPassword: string,
  @Body('newPassword') newPassword: string
) {
  return this.userService.updatePassword(
    id, 
    currentPassword, 
    newPassword
  );
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