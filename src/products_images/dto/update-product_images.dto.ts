import { PartialType } from "@nestjs/mapped-types";
import { CreateProductImageDto } from "./create-product_images.dto";

export class UpdateProductImageDto  extends  PartialType (CreateProductImageDto){};