
import { Product } from "src/products/entities/product.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column({name: 'product_id'})
    productId: number;

    @Column({name: 'image_url', type: 'text'})
    imageUrl: string;

    @Column({name: 'is_primary', type: 'boolean', default: false})
    isPrimary: boolean;

    @Column({name: 'alt_text', type: 'varchar', length: 255, nullable: true})
    altText: string; 

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string; 

    @ManyToOne(() => Product,  prodcut => prodcut.productImages)
    @JoinColumn({name: 'product_id'})
    product: Product;

}