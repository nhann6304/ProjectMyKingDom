import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { Repository } from 'typeorm';
import {
    CreateProductCategoryDto,
    UpdateProductCategoriesDto,
} from './product-category.dto';
import { ProductCategoryEntity } from './product-category.entity';
import { UtilConvert } from 'src/utils/convert.ultils';
import { UtilCalculator } from 'src/utils/caculator.utils';
import { UtilORM } from 'src/utils/orm.uutils';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private productCategoriesRepository: Repository<ProductCategoryEntity>,
    ) { }

    async findOneByID(id: string) {
        const item = await this.productCategoriesRepository.findOne({
            where: { id },
            relations: {
                parent: true,
                createdBy: true,
                updatedBy: true,
            },
        });
        delete item.createdBy.user_password;
        return item;
    }

    async findCateBySlug(slug: string) {
        const items = await this.productCategoriesRepository.findOne({
            where: { pc_slug: slug },
            relations: {
                children: true,
            }
        })

        return items;
    }

    async createProductCate(req: Request, productData: CreateProductCategoryDto) {
        const me = req['user'];

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
                throw new BadRequestException('Danh mục cha không tồn tại');
            }
            newProductCate.parent = parentCategory;
        }

        const newItem = await this.productCategoriesRepository.save(newProductCate);

        return newItem;
    }

    async findAll(query: AQueries, req: Request) {
        const { fields, limit, page, filter, isDeleted } = query;
        const objFilter = UtilConvert.convertJsonToObject(filter);

        let arrFields: Array<string> = [
            'parent.id',
            'children.id',
            'parent.isDeleted',
            'children.isDeleted',
        ];
        const queryBuilder =
            this.productCategoriesRepository.createQueryBuilder('parent');

        if (fields) {
            if (Array.isArray(fields)) {
                const fieldsChild = fields.map((item) => `parent.${item}`);
                const fieldsParent = fields.map((item) => `children.${item}`);
                arrFields = [...arrFields, ...fieldsChild, ...fieldsParent];
            } else {
                const stringChild = `children.${fields}`;
                const stringParent = `parent.${fields}`;
                arrFields = [...arrFields, stringChild, stringParent];
            }
        }

        queryBuilder
            .leftJoinAndSelect('parent.children', 'children')
            .where('parent.parentId IS NULL')
            .select(arrFields)
            .distinct(true); // Đảm bảo không có bản ghi trùng lặp

        // Áp dụng filter cho cả parent và children
        if (objFilter !== undefined) {
            Object.entries(objFilter).forEach(([key, value]) => {
                queryBuilder.andWhere(
                    `(parent.${key} = :${key} OR children.${key} = :${key})`,
                    { [key]: value },
                );
            });
        }

        // Áp dụng filter với isDeleted nếu có
        if (isDeleted !== undefined) {
            queryBuilder.andWhere(
                '(parent.isDeleted = :isDeleted OR children.isDeleted = :isDeleted)',
                { isDeleted },
            );
        }

        // Áp dụng pagination
        queryBuilder
            .take(limit)
            .skip(UtilCalculator.calculatorSkipPage({ limit, page }));

        const result = await queryBuilder.getMany();

        // Lọc bỏ danh mục cha nếu ID trùng với danh mục con
        const childIds = result
            .filter((parent) => Array.isArray(parent.children)) // Kiểm tra nếu có mảng children
            .flatMap((parent) => parent.children.map((child) => child.id)); // Lấy danh sách các id từ mảng children

        const filteredResult = result.filter(
            (parent) => !childIds.includes(parent.id),
        );

        // Hàm đệ quy để lọc children theo filter
        const filterItemsWithChildren = (data: Array<ProductCategoryEntity>) => {
            return data
                .filter(
                    (val) =>
                        val.isDeleted === UtilConvert.convertStringToBoolean(isDeleted),
                )
                .map((val) => ({
                    ...val,
                    children: val.children
                        ? filterItemsWithChildren(
                            val.children.filter((child) => {
                                return Object.entries(objFilter).every(
                                    ([key, value]) => child[key] === value,
                                );
                            }),
                        )
                        : [],
                }));
        };

        const items = filterItemsWithChildren(filteredResult);

        return {
            items,
            totalItems: items.length,
        };
    }



    async update({
        req,
        updateData,
        id,
    }: {
        req: Request;
        updateData: UpdateProductCategoriesDto;
        id: string;
    }) {
        const user = req['user'];

        const findProductCate = await this.findOneByID(id);
        if (!findProductCate) {
            throw new BadRequestException('Danh mục sản phẩm không tồn tại');
        }

        if (updateData.parentId) {
            if (updateData.parentId === id) {
                throw new BadRequestException(
                    'Danh mục con không thể trở thành cha của chính nó',
                );
            }

            const findParentCategory = await this.productCategoriesRepository.findOne(
                {
                    where: { id: updateData.parentId },
                    relations: ['parent'],
                },
            );

            if (!findParentCategory) {
                throw new BadRequestException('Danh mục cha không tồn tại');
            }

            let currentParent = findParentCategory;
            while (currentParent) {
                if (currentParent.id === id) {
                    throw new BadRequestException(
                        'Danh mục cha không thể là danh mục con của chính danh mục được cập nhật',
                    );
                }
                currentParent = currentParent.parent;
            }

            findProductCate.parent = findParentCategory;
        }

        const updatedCategory = await this.productCategoriesRepository.save({
            ...findProductCate,
            ...updateData,
            updatedBy: user,
        });

        if (!updatedCategory) {
            throw new BadRequestException('Update danh mục thất bại');
        }

        const items = await this.findOneByID(updatedCategory.id);

        return items;
    }

    async sortDeleted({ req, id }: { req: Request; id: string }) {
        const me = req['user'];

        const productCate = await this.findOneByID(id);

        if (!productCate) {
            throw new BadRequestException(' danh mục sản phẩm không tồn tại');
        }

        if (productCate.isDeleted) {
            throw new BadRequestException('Danh mục sản phẩm đã được xóa');
        }

        await this.productCategoriesRepository.update(id, {
            isDeleted: true,
            deletedBy: me,
            deletedAt: new Date(),
        });
        return true;
    }

    async restoreDelete({ id }: { id: string }) {
        const productCate = await this.findOneByID(id);

        if (!productCate) {
            throw new BadRequestException('Danh mục sản phẩm không tồn tại');
        }

        if (!productCate.isDeleted) {
            throw new BadRequestException('Danh mục sản phẩm đã được khôi phục');
        }

        await this.productCategoriesRepository.update(id, {
            isDeleted: false,
            deletedAt: null,
        });
        return true;
    }

    async deletedProductCate(id: string) {
        const productCate = await this.productCategoriesRepository.findOne({
            where: { id },
            relations: {
                parent: true,
                children: true,
                createdBy: true,
                updatedBy: true,
            },
        });

        if (!productCate) {
            throw new BadRequestException('Danh mục sản phẩm không tồn tại');
        }

        // Chỉ cho phép xóa khi danh mục sản phẩm đã xóa mền
        if (productCate.isDeleted === false) {
            throw new BadRequestException('Danh mục sản phẩm không thể xóa');
        }

        await this.productCategoriesRepository.delete(id);

        return true;
    }
}
