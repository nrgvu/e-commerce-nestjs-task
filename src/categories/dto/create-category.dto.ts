import { IsNotEmpty, IsOptional, IsString, MaxLength,  } from "class-validator";   

export class CreateCategoryDto {


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(450)
    description: string;

    
    // there is no need to add the image to DTO 
}