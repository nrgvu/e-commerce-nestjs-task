import {Injectable, NotFoundException , ConflictException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User, UserRole} from './entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';    

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService { 
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
    ) {}

    async create( createUserDto: CreateUserDto): Promise<User>{
        const {email, name, password, role} = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: {email: email},
        });
        if(existingUser){
            throw new ConflictException('Email already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    

    const user = this.userRepository.create({
        email: email, 
        name: name, 
        role: UserRole.CUSTOMER, 
        password: hashedPassword,
    })


    return this.userRepository.save(user); // ! I think here it will return the password and this is a security issue 
    //*  the solution for the above security issue is to add @exclude  decorator that excludes the password field
    //*  from being returned whenever there is a user object in the api response even if the password is hashed
}

async getAll(queryUserDto: QueryUserDto): Promise<User[]>{
    const {page = 1, limit = 10} = queryUserDto;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);
    const users = await queryBuilder.getMany();
    return users;
}


async getOne(id: number): Promise<User | null>{
    const user = await this.userRepository.findOne({where: {id: id}});
    if(!user){
        throw new NotFoundException(`user with id: ${id} not found`);
    }
    return user;
}

async update(id: number, UpdateUserDto: UpdateUserDto): Promise<User>{
    const {name, email, password, role} = UpdateUserDto;
    //* the "await" in the line below is so important, because when I forgot it, I wasn't able to access the properties of the "userToUpdate"
    const userToUpdate = await this.userRepository.findOne({where: {id:id}});
    if(!userToUpdate){
        throw new NotFoundException(`user with id: ${id} not found`)
    }

    if(name !== undefined){
        userToUpdate.name = name.trim();
    }

    if(email !== undefined){
        userToUpdate.email = email.trim();
    }

    if(password !== undefined){
        const hashedPassword = await bcrypt.hash(userToUpdate.password, 10);
        userToUpdate.password = hashedPassword;
    }

    return this.userRepository.save(userToUpdate)
}


async remove(id: number){
   const userToRemove = await this.userRepository.findOne({where:{id:id}});
   if(!userToRemove){
    throw new NotFoundException(`user with id: ${id} not found`);
   }
   return this.userRepository.remove(userToRemove);
}


async findByEmail(email):Promise<User | null>{
    const user = await this.userRepository.findOne({where: {email: email}});
    if(!user){
        return null
    }

    return user;
}


async updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
  // 1. Fetch the user from the database
  const user = await this.userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException('User not found.');
  }

  // 2. Validate the current password
  // This step assumes you have a method to compare a plain text password with a hashed password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid current password.');
  }

  // 3. Hash the new password before saving
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // 4. Update and save the user
  user.password = hashedNewPassword;
  await this.userRepository.save(user);
}


}

//  todo create()
// todo  getAll()
// todo  getOne()
// todo  update()
//  todo remove()
