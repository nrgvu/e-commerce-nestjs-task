import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-category.dto";

/*
    the best practice is to use the "extends" with PartialType() from nestjs mapped-types, because 
   * 1- there is no need to repeat  all the fields of the "CreateCategoryDto" class 
   * 2- synchronization, which means that when you update something in the "CreateCategoryDto class" it will automatically update in UpdateCategoryDto
   * 3- the code is, short, easy to understand, readable
*/

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {};

