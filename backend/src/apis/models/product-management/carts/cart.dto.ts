import { PartialType } from "@nestjs/mapped-types";
import { ProductsEntity } from "../products/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CONST_ERROR } from "src/constants";
import { EAgeGroup } from "src/enums/EAge.enum";


export class AddCartDto {
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Id sản phẩm') })
    @ApiProperty({ example: "48cdc438-dca6-490e-a1fb-c8dca12c85ae", description: "ID sản phẩm" })
    product_id: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Só lượng sản phẩm cần thêm') })
    quantity: number;


}

export class UpdateCartDto { }
