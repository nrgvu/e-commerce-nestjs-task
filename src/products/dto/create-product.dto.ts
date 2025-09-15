import { isNotEmpty, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, MaxLength,  } from "class-validator";   

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(450)
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    categoryId?: number;

    
}