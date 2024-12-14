import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ProductCategoriesService } from '../product-categories/product-categories.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private productRepository: Repository<ProductsEntity>,
        private productCategoriesService: ProductCategoriesService
    ) { }

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







}





