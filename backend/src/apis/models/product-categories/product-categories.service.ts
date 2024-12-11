import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './product-category.entity';
import { Repository } from 'typeorm';
import e, { Request } from 'express';
import { CreateProductCategoryDto } from './product-category.dto';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { IProductCategory } from 'src/interfaces/models/product-categories.interface';
import { calculatorSkipPage } from 'src/utils/caculator.utils';

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

    async findAll(query: AQueries, req: Request) {
        const { fields, limit, page } = query;
        let arrFields: Array<string> = ["parent.id", "children.id"]
        const queryBuilder = this.productCategoriesRepository.createQueryBuilder("parent");

        if (fields) {
            if (Array.isArray(fields)) {
                const fieldsChild = fields.map(item => `parent.${item}`);
                const fieldsParent = fields.map(item => `children.${item}`)
                arrFields = [...arrFields, ...fieldsChild, ...fieldsParent];
            } else {
                const stringChild = `children.${fields}`
                const stringParent = `parent.${fields}`
                arrFields = [...arrFields, stringChild, stringParent]
            }
        }

        const result = await queryBuilder
            .leftJoinAndSelect('parent.children', 'children')
            .take(limit)
            .where('parent.parentId IS NULL')
            .skip(calculatorSkipPage({ limit, page }))
            .select(arrFields)
            .distinct(true) // Đảm bảo không có bản ghi trùng lặp
            .getMany();

        // const result = await this.productCategoriesRepository.find()
        console.log(result);

        const childIds = result
            .filter(parent => Array.isArray(parent.children))  // Kiểm tra nếu có mảng children
            .flatMap(parent => parent.children.map(child => child.id));  // Lấy danh sách các id từ mảng children

        const filteredResult = result.filter(parent => !childIds.includes(parent.id));
        console.log(filteredResult.length);
        return filteredResult


    }

}
