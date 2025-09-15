import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductImageDto { 
    
    @Type(() => Number)
    @IsNumber()
    productId: number;
    
    @Type(() => Boolean)
    @IsBoolean()
    isPrimary: boolean;

    @IsString()
    @MaxLength(255)
    altText: string; 

}