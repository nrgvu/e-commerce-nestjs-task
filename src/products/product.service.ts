import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { CategoryService } from "src/categories/category.service";





/*
    todo: create()
    todo: getAll()
    todo: getOne()
    todo: update()
    todo: remove()

*/
@Injectable()
export class ProductService {
   

constructor(       
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
){};

async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, stock, categoryId } = createProductDto;
    
    if (categoryId) {
        const category = await this.categoryService.getOne(categoryId);
        
        if (!category) {
            throw new BadRequestException(`Category with ID ${categoryId} not found`);
        }
    }
    
    const existingProduct = await this.productRepository.findOne({
        where: { name }
    });
    
    if (existingProduct) {
        throw new ConflictException(`The product: ${name} already exists`);
    }

    const product = this.productRepository.create({
        name,
        description,
        price,
        stock,
        categoryId
    });

    return this.productRepository.save(product);
}


    async getAll(): Promise<Product[]> {
        //  const queryBuilder = this.productRepository.createQueryBuilder('product')
        //  const products = await queryBuilder.getMany();
        const products = await this.productRepository.find({relations: ['category', 'productImages']})
         return products.map(product => ({
            ...product,
            category: product.category || { id: 0, name: 'Uncategorized'}
         }));
    }


    async getOne(id: number): Promise<Product>{
        const product = await this.productRepository.findOne({where:{id:id}, relations:[ 'category', 'productImages']});
        if(!product){
            throw new NotFoundException(`product with id: ${id} not found`);
        }

        return product;
    }


    async update(id: number, UpdateProductDto: UpdateProductDto){
        const {name, description, price, stock, categoryId} = UpdateProductDto;

        const productToUpdate = await this.productRepository.findOne({where: {id:id}});
        if(!productToUpdate){
            throw new NotFoundException(`product with id: ${id} not found`);
        }
    
        if(name !== undefined){
            productToUpdate.name = name.trim();
        }
        if(description !== undefined){
            productToUpdate.description = description.trim();
        }
        if(price !== undefined){
            productToUpdate.price = price;
        }
        if(stock !== undefined){
            productToUpdate.stock = stock;
        }

        if(categoryId !== undefined){
            productToUpdate.categoryId = categoryId;
        }

        await this.productRepository.update(id, productToUpdate);
        return this.productRepository.findOne({where: { id }, relations:['category']}); 
        // return this.productRepository.save(productToUpdate);
    }


    async remove(id: number): Promise<Product>{
        const productToRemove = await this.productRepository.findOne({where: {id: id}});

        if(!productToRemove){
            throw new NotFoundException(`product with id:${id} not found`);
        }

        return this.productRepository.remove(productToRemove);
    }    

}