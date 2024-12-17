import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { UtilORM } from 'src/utils/orm.uutils';
import { EAgeGroup } from 'src/enums/EAge.enum';

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

        const findProductCate = await this.productCategoriesService.findOneByID(productData.productCate_Id);

        if (!findProductCate) {
            throw new BadRequestException("Danh mục sản phẩm không tồn tại");
        }

        const newProduct = this.productRepository.create({ createdBy: me, pc_category: findProductCate, ...productData });

        const result = await this.productRepository.save(newProduct);

        return result;
    }


    async findAllProduct({ query }: { query: AQueries<ProductsEntity> }) {
        const { isDeleted, fields, limit, page } = query;
        const ALIAS_NAME = "product";
        console.log(fields);
        const result = new UtilORM<ProductsEntity>(this.productRepository, ALIAS_NAME)
            .leftJoinAndSelect(["pc_category"])
            .select(fields)
            .skip({ limit, page })
            .take({ limit })
            .where({
                // "pc_category": "54ccfb6d-a2f5-404f-a59b-d8a780143a8d",
                // "prod_agePlay": EAgeGroup.Under1Year,
                // "prod_sku": "sku 321",
                // "prod_price": [1000000.0, 1500000.00]
            })

        const queryBuilder: SelectQueryBuilder<ProductsEntity> = result.build();


        const [items, totalItems] = await Promise.all([
            queryBuilder.getMany(),
            queryBuilder.getCount(),
        ]);

        return {
            items,
        }

    }







}





