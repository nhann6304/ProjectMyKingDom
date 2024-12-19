import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { UtilORM } from 'src/utils/orm.uutils';
import { EAgeGroup } from 'src/enums/EAge.enum';
import { IFilter } from 'src/interfaces/common/IFilterAction.interface';
import { UtilConvert } from 'src/utils/convert.ultils';
import { UtilCalculator } from 'src/utils/caculator.utils';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private productRepository: Repository<ProductsEntity>,
        private productCategoriesService: ProductCategoriesService
    ) { }


    async findById({ id }: { id: string }) {
        const data = await this.productRepository.findOne({
            where: { id },
            relations: {
                pc_category: true
            }
        })
        return data
    }

    async createProduct({ req, productData }: { req: Request, productData: CreateProductDto }) {
        const me = req['user'];
        let finalPrice = productData.prod_price
        const findProductCate = await this.productCategoriesService.findOneByID(productData.productCate_Id);

        if (!findProductCate) {
            throw new BadRequestException("Danh mục sản phẩm không tồn tại");
        }

        if (productData.discount != null && productData.discount >= 0) {
            finalPrice = UtilCalculator.calculatorDiscountPrice({
                discount_item: productData.discount,
                price_item: productData.prod_price
            });
        }

        const newProduct = this.productRepository.create({
            createdBy: me,
            pc_category: findProductCate,
            ...productData,
            prod_price: finalPrice,
        });

        const result = await this.productRepository.save(newProduct);

        return result;
    }

    async findAllProduct({ query }: { query: AQueries<ProductsEntity> }) {
        const { isDeleted, fields, limit, page, filter } = query;

        const objFilter = UtilConvert.convertJsonToObject(filter)

        const ALIAS_NAME = "product";

        const result = new UtilORM<ProductsEntity>(this.productRepository, ALIAS_NAME)
            .leftJoinAndSelect(["pc_category"])
            .select(fields)
            .skip({ limit, page })
            .take({ limit })
            .where(objFilter, isDeleted)

        const queryBuilder: SelectQueryBuilder<ProductsEntity> = result.build();

        const [items, totalItems] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount(),
        ]);
        return {
            items,
        }
    }


    async updateProduct({ id, req, updateData }: { updateData: UpdateProductDto, req: Request, id: string }) {
        const me = req["user"];
        // Tìm sản phẩm theo ID
        const findProduct = await this.findById({ id });

        // Lấy giá ban đầu từ sản phẩm
        let finalPrice = findProduct.prod_price;

        if (!findProduct || findProduct.isDeleted === true) {
            throw new BadRequestException("Sản phẩm không tồn tại");
        }

        // Kiểm tra và tính toán giá nếu có cập nhật discount
        if (updateData.discount != null && updateData.discount >= 0) {
            // Nếu có cập nhật discount và có thay đổi giá
            if (updateData.prod_price != null && updateData.prod_price !== findProduct.prod_price) {
                finalPrice = UtilCalculator.calculatorDiscountPrice({
                    discount_item: updateData.discount,
                    price_item: updateData.prod_price
                });
            } else {
                // Nếu chỉ có update discount, giữ giá cũ và tính discount
                finalPrice = UtilCalculator.calculatorDiscountPrice({
                    discount_item: updateData.discount,
                    price_item: findProduct.prod_price
                });
            }
        } else if (updateData.prod_price != null && updateData.prod_price !== findProduct.prod_price) {
            // Nếu chỉ update giá mà không thay đổi discount
            finalPrice = updateData.prod_price;
        }

        // Cập nhật sản phẩm với giá đã tính toán
        const updatedProduct = await this.productRepository.save({
            ...findProduct,
            ...updateData,
            prod_price: finalPrice,
            updatedBy: me,
        });

        // Lấy sản phẩm đã được cập nhật
        const items = await this.findById({ id: updatedProduct.id });

        return items;
    }


    async sortDeleted({ id, req }: { req: Request, id: string }) {
        const me = req['user']

        const findProduct = await this.findById({ id });

        if (!findProduct) {
            throw new BadRequestException("Sản phẩm không tồn tại");
        }

        if (findProduct.isDeleted) {
            throw new BadRequestException("Danh mục sản phẩm đã được xóa");

        }

        await this.productRepository.update(id, {
            isDeleted: true,
            deletedBy: me,
            deletedAt: new Date()
        })

        return true
    }

    async restoreDelete({ id }: { id: string }) {

        const findProduct = await this.findById({ id });

        if (!findProduct) {
            throw new BadRequestException("Sản phẩm không tồn tại");
        }

        if (!findProduct.isDeleted) {
            throw new BadRequestException("Sản phẩm đã được khôi phục");
        }

        await this.productRepository.update(id, {
            isDeleted: false,
            deletedAt: null
        })

        return true
    }

    async deleteProduct(id: string): Promise<boolean> {

        const productData = await this.productRepository.findOne({
            where: { id },
            relations: {
                pc_category: false
            }
        });

        if (!productData) {
            throw new BadRequestException("Sản phẩm không tồn tại");
        }

        if (productData.isDeleted === false) {
            throw new BadRequestException("Sản phẩm không nằm trong thùng rác");
        }

        await this.productRepository.delete(id);

        return true
    }
}





