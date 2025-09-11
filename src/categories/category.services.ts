import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";



/*
    todo: create()
    todo: getAll()
    todo: getOne()
    todo: update()
    todo: remove()

*/
export class CategoryService {

    constructor(       
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}

    async create(CreateCategoryDto: CreateCategoryDto):Promise<Category>{
        const {name, description} = CreateCategoryDto;
        const existingCategory = await this.categoryRepository.findOne({where: {name:name}});
        if(existingCategory){
            throw new ConflictException(`the category: ${name} already exist`)
        }

        const category = this.categoryRepository.create({
            name: name, 
            description: description,
        })

        return this.categoryRepository.save(category);
    }


    async getAll(): Promise<Category[]> {
         const queryBuilder = this.categoryRepository.createQueryBuilder('category')
         const categories = await queryBuilder.getMany();
         return categories;
    }

    async getOne(id: number): Promise<Category>{
        const category = await this.categoryRepository.findOne({where:{id:id}});
        if(!category){
            throw new NotFoundException(`Category with id: ${id} not found`);
        }

        return category;
    }

    async update(id: number, UpdateCategoryDto: UpdateCategoryDto){
        const {name, description} = UpdateCategoryDto;

        const categoryToUpdate = await this.categoryRepository.findOne({where: {id:id}});
        if(!categoryToUpdate){
            throw new NotFoundException(`Category with id: ${id} not found`);
        }

        if(name !== undefined){
            categoryToUpdate.name = name.trim();
        }
        if(description !== undefined){
            categoryToUpdate.description = description.trim();
        }

        return this.categoryRepository.save(categoryToUpdate);
    }

    async remove(id: number): Promise<Category>{
        const categoryToRemove = await this.categoryRepository.findOne({where: {id: id}});

        if(!categoryToRemove){
            throw new NotFoundException(`category with id:${id} not found`);
        }

        return this.categoryRepository.remove(categoryToRemove);
    }


    

}