import { PartialType } from "@nestjs/mapped-types";
import { CartDetailsEntity } from "./cart-details.entity";
import { ProductsEntity } from "../products/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateCartDetailDto implements Partial<CartDetailsEntity> {

    @IsOptional()
    @ApiProperty({ example: "a2715463-0258-42dc-a3fc-586a2286e139", required: true })
    product_id: string;

    @IsOptional()
    @ApiProperty({ example: 1, required: true })
    quantity: number;
}
