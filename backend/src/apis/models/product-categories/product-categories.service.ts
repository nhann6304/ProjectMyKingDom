import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './product-category.entity';
import { Repository } from 'typeorm';
import e, { Request } from 'express';
import { CreateProductCategoryDto } from './product-category.dto';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private productCategoriesRepository: Repository<ProductCategoryEntity>) { }

    async createProductCate(req: Request, productData: CreateProductCategoryDto) {
        const me = req["user"];

        const newProductCate = this.productCategoriesRepository.create({
            pc_name: productData.pc_name,
            pc_description: productData.pc_description,
            createdBy: me,
        });

        if (productData.parentId) {
            const parentCategory = await this.productCategoriesRepository.findOne({
                where: { id: productData.parentId },
            });

            if (!parentCategory) {
                throw new BadRequestException("Danh mục cha không tồn tại");
            }
            newProductCate.parent = parentCategory;
        }

        const newItem = await this.productCategoriesRepository.save(newProductCate);

        return newItem;
    }

    // async findAll(query: AQueries) {
    //     console.log(query.fields);
    //     console.log(query.limit);
    //     console.log(query.page);
    // }
}
