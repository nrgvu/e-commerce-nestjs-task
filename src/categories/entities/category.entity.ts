import { Product } from 'src/products/entities/product.entity';

import {
    Entity,
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany,
    
} from 'typeorm';

@Entity('categories')
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;
    
    @Column({type: 'text', nullable: true})
    description: string;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, product => product.category)
    products: Product[]


}