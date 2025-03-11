import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EAgeGroup } from 'src/enums/EAge.enum';
import { ProductsEntity } from './product.entity';
import { ProductCategoryEntity } from '../product-categories/product-category.entity';
import { IProduct } from 'src/interfaces/models/product.interface';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CONST_ERROR } from 'src/constants';
import { EGender } from 'src/enums/EGender.enum';

export class CreateProductDto extends PartialType(ProductsEntity) {
    @ApiProperty({
        example: 'Mô hình siêu anh hùng Spiderman 30cm SPIDERMAN E7333',
    })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Tên sản phẩm') })
    prod_name: string;

    @ApiProperty({ type: String })
    @IsOptional()
    prod_thumb?: string;

    @ApiProperty({ example: 'spiderman', required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Thương hiệu') })
    prod_company: string;

    @ApiProperty({ example: 'sku e7333', required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Mã hàng hóa') })
    prod_sku: string;

    @ApiProperty({ example: 559000, required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Giá sản phẩm') })
    prod_price: number;

    @ApiProperty({ example: 'Mô tả cho sì bai đơ men', required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Mô tả sản phẩm') })
    prod_description: string;

    @ApiProperty({ example: 'Trung Quốc', required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Quốc gia') })
    prod_nation: string;

    @ApiProperty({ example: EAgeGroup.UNDER_ONE_YEAR, required: true })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Độ tuổi') })
    prod_agePlay: EAgeGroup;

    @ApiProperty({
        example: [EGender.MALE, EGender.FEMALE], // Cho phép cả 2 giới tính
        required: true,
        isArray: true,
    })
    @IsArray({ message: "Giới tính phải là một danh sách" }) // Kiểm tra là mảng
    @ArrayNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Giới tính khuyên dùng cho sản phẩm") }) // Không được để trống
    @IsEnum(EGender, { each: true, message: "Giới tính không hợp lệ" }) // Mỗi phần tử phải là `EGender`
    prod_gender: EGender[];

    @IsOptional()
    @ApiProperty({ type: 'number', required: false, minimum: 0, default: 1 })
    discount?: number;

    @ApiProperty({ example: '54ccfb6d-a2f5-404f-a59b-d8a780143a8d' })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY('Danh mục sản phẩm') })
    productCate_Id: string;

    @IsOptional()
    @ApiProperty({ type: 'number', required: false, minimum: 0, default: 1 })
    prod_quantity: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @ApiProperty({ type: 'number', required: false, minimum: 0, default: 1 })
    discount?: number;
}
