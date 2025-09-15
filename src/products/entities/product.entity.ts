import { Category } from 'src/categories/entities/category.entity';
import { ProductImage } from 'src/products_images/entities/product_images.entity';
import {
    Entity,
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinTable,
    
} from 'typeorm';

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;
    
    @Column({type: 'text'})
    description: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable: true})
    categoryId: number;

    @ManyToOne(() => Category, category => category.products ,{onDelete: 'SET NULL' })
    @JoinTable({name: 'categoryId'})
    category: Category;

    @OneToMany(() => ProductImage, productImage => productImage.product)
    productImages: ProductImage[];

}