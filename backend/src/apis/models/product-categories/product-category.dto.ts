import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CONST_ERROR } from "src/constants";
import { ProductCategoryEntity } from "./product-category.entity";

export class CreateProductCategoryDto extends PartialType(ProductCategoryEntity) {
    @ApiProperty({ example: "84776a72-7609-4307-abb0-c44c2aee7549", required: false })
    @IsOptional()
    parentId?: string; // ID của danh mục cha, không bắt buộc

    @ApiProperty({ example: "Thế giới động vật" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Tên danh mục") })
    pc_name: string;

    @ApiProperty({ example: "Đồ chơi liên quan đến thế giới động vật" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Mô tả danh mục") })
    pc_description: string;
}




