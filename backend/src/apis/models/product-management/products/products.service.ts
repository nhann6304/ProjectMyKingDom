import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { UtilORM } from 'src/utils/orm.uutils';
import { EAgeGroup } from 'src/enums/EAge.enum';
import { IFilter } from 'src/interfaces/common/IFilterAction.interface';
import { UtilConvert } from 'src/utils/convert.ultils';
import { UtilCalculator } from 'src/utils/caculator.utils';
import { CartsService } from '../carts/carts.service';
import { IUser } from 'src/interfaces/common/IUser.interface';
import { UserEntity } from '../../users/user.entity';
import { ImageEntity } from 'src/apis/common/images/image.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private productRepository: Repository<ProductsEntity>,
        @InjectRepository(ImageEntity)
        private imagesRepository: Repository<ImageEntity>,
        private productCategoriesService: ProductCategoriesService,
        private cardsService: CartsService,
    ) { }

    async findById({ id }: { id: string }) {
        const data = await this.productRepository.findOne({
            where: { id },
            relations: {
                pc_category: true,
            },
        });
        return data;
    }

    async createProduct({
        req,
        productData,
    }: {
        req: Request;
        productData: CreateProductDto;
    }) {
        const me = req['user'];
        let finalPrice = 0;

        const findProductCate = await this.productCategoriesService.findOneByID(
            productData.productCate_Id,
        );

        const findImage = await this.imagesRepository.findBy({
            id: In(productData.image_ids), //In là tra nhiều id
        });

        if (!findProductCate) {
            throw new BadRequestException('Danh mục sản phẩm không tồn tại');
        }

        if (productData.discount != null && productData.discount >= 0) {
            finalPrice = UtilCalculator.calculatorDiscountPrice({
                discount_item: productData.discount,
                price_item: productData.prod_price,
            });
        } else {
            finalPrice = productData.prod_price;
        }

        const newProduct = this.productRepository.create({
            createdBy: me,
            pc_category: findProductCate,
            ...productData,
            prod_price_official: finalPrice,
            prod_thumbnails: findImage,
        });

        const result = await this.productRepository.save(newProduct);

        return result;
    }

    async findAllProduct({ query }: { query: AQueries<ProductsEntity> }) {
        const { isDeleted, fields, limit, page, filter, sort } = query;
        const objFilter = UtilConvert.convertJsonToObject(filter as any);
        const objSort = UtilConvert.convertSortToObject(sort as any);
        const ALIAS_NAME = 'products';
        console.log("sort:::", sort);
        const result = new UtilORM<ProductsEntity>(
            this.productRepository,
            ALIAS_NAME,
        )
            .select(fields)
            .leftJoinAndSelect(['pc_category', 'prod_thumbnails']);

        if (objFilter !== undefined) {
            result.where(objFilter, isDeleted);
        }

        // 1️⃣ Query đếm tổng số sản phẩm trước khi áp dụng skip/take
        const queryBuilderCount: SelectQueryBuilder<ProductsEntity> =
            result.build();
        const totalItems = await queryBuilderCount.getCount(); // ✅ Không bị ảnh hưởng bởi phân trang

        // 2️⃣ Query lấy sản phẩm có phân trang
        const queryBuilder: SelectQueryBuilder<ProductsEntity> = result
            .skip({ limit, page }) // ✅ Áp dụng phân trang ở đây
            .take({ limit })
            .sort(objSort as any)
            .build();

        const items = await queryBuilder.getMany();

        // 3️⃣ Chuẩn hóa dữ liệu
        const transformedItems = items.map((item) => ({
            ...item,
            prod_thumbnails: item.prod_thumbnails.map((thumbnail) => ({
                id: thumbnail.id,
                img_url: thumbnail.img_url,
                img_alt: thumbnail.img_alt,
            })),
        }));

        return {
            items: transformedItems,
            totalItems,
        };
    }

    async findProductBySlug(slug: string, query: AQueries<ProductsEntity>) {
        const { limit, page, filter, sort } = query;
        const ALIAS_NAME = 'products';

        // 1️⃣ Tìm danh mục theo slug
        const categoryItem =
            await this.productCategoriesService.findCateBySlug(slug);
        if (!categoryItem) return { items: [], totalItems: 0 };

        // 2️⃣ Lấy danh sách ID của danh mục cha + con
        const categoryIds = [categoryItem.id];
        if (categoryItem.children?.length > 0) {
            categoryIds.push(...categoryItem.children.map((child) => child.id));
        }

        // 3️⃣ Đếm tổng số sản phẩm trước khi phân trang
        const totalItems = await this.productRepository.count({
            where: {
                pc_category: { id: In(categoryIds) },
            },
        });

        // 4️⃣ Lấy danh sách sản phẩm có phân trang
        let productItems = await this.productRepository.find({
            where: {
                pc_category: { id: In(categoryIds) },
            },
            skip: limit && page ? (page - 1) * limit : undefined,
            take: limit || undefined,
            relations: ['prod_thumbnails'],
        });

        // 5️⃣ Nếu có filter, lọc lại sản phẩm theo filter
        if (filter) {
            const objFilter = UtilConvert.convertJsonToObject(filter as any) || {};
            productItems = productItems.filter((product) => {
                return Object.entries(objFilter).every(([key, value]) => {
                    if (Array.isArray(product[key])) {
                        return Array.isArray(value)
                            ? value.some((v) => product[key].includes(v))
                            : product[key].includes(value);
                    }
                    if (
                        Array.isArray(value) &&
                        value.every(
                            (v) => typeof v === 'object' && v !== null && 'min' in v,
                        )
                    ) {
                        return value.some((range) =>
                            range.max === null
                                ? product[key] >= range.min
                                : product[key] >= range.min && product[key] <= range.max,
                        );
                    }
                    if (typeof value === 'object' && value !== null && 'min' in value) {
                        return value.max === null
                            ? product[key] >= value.min
                            : product[key] >= value.min && product[key] <= value.max;
                    }
                    return Array.isArray(value)
                        ? value.includes(product[key])
                        : product[key] == value;
                });
            });
        }

        // 6️⃣ Nếu có sort, thực hiện sắp xếp
        if (sort) {
            const objSort = UtilConvert.convertSortToObject(sort as any);

            // Chuyển order về chữ hoa để đồng nhất
            const sortOrder = objSort.order?.toUpperCase() === 'DESC' || objSort.order?.toUpperCase().includes('DESC') ? 'DESC' : 'ASC';
            const sortField = objSort.field as keyof ProductsEntity;

            productItems.sort((a, b) => {
                let valueA = a[sortField];
                let valueB = b[sortField];

                // Chuyển đổi về số nếu có thể
                if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                    valueA = Number(valueA);
                    valueB = Number(valueB);
                }

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortOrder === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                }
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return sortOrder === 'ASC' ? valueA - valueB : valueB - valueA;
                }
                return 0;
            });
        }


        // 7️⃣ Chuẩn hóa dữ liệu trước khi trả về
        const transformedItems = productItems.map((item) => ({
            ...item,
            prod_thumbnails: item.prod_thumbnails.map((thumbnail) => ({
                id: thumbnail.id,
                img_url: thumbnail.img_url,
                img_alt: thumbnail.img_alt,
            })),
        }));

        console.log(transformedItems.map((val) => {
            return val.discount
        }));

        return {
            items: transformedItems,
            totalItems,
        };
    }

    async updateProduct({
        id,
        req,
        updateData,
    }: {
        updateData: UpdateProductDto;
        req: Request;
        id: string;
    }) {
        const me = req['user'];
        // Tìm sản phẩm theo ID
        const findProduct = await this.findById({ id });

        // Lấy giá ban đầu từ sản phẩm
        let finalPrice = findProduct.prod_price;

        if (!findProduct || findProduct.isDeleted === true) {
            throw new BadRequestException('Sản phẩm không tồn tại');
        }

        // Kiểm tra và tính toán giá nếu có cập nhật discount
        if (updateData.discount != null && updateData.discount >= 0) {
            // Nếu có cập nhật discount và có thay đổi giá
            if (
                updateData.prod_price != null &&
                updateData.prod_price !== findProduct.prod_price
            ) {
                finalPrice = UtilCalculator.calculatorDiscountPrice({
                    discount_item: updateData.discount,
                    price_item: updateData.prod_price,
                });
            } else {
                // Nếu chỉ có update discount, giữ giá cũ và tính discount
                finalPrice = UtilCalculator.calculatorDiscountPrice({
                    discount_item: updateData.discount,
                    price_item: findProduct.prod_price,
                });
            }
        } else if (
            updateData.prod_price != null &&
            updateData.prod_price !== findProduct.prod_price
        ) {
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

    async sortDeleted({ id, req }: { req: Request; id: string }) {
        const me = req['user'];

        const findProduct = await this.findById({ id });

        if (!findProduct) {
            throw new BadRequestException('Sản phẩm không tồn tại');
        }

        if (findProduct.isDeleted) {
            throw new BadRequestException('Danh mục sản phẩm đã được xóa');
        }

        await this.productRepository.update(id, {
            isDeleted: true,
            deletedBy: me,
            deletedAt: new Date(),
        });

        return true;
    }

    async restoreDelete({ id }: { id: string }) {
        const findProduct = await this.findById({ id });

        if (!findProduct) {
            throw new BadRequestException('Sản phẩm không tồn tại');
        }

        if (!findProduct.isDeleted) {
            throw new BadRequestException('Sản phẩm đã được khôi phục');
        }

        await this.productRepository.update(id, {
            isDeleted: false,
            deletedAt: null,
        });

        return true;
    }

    async deleteProduct(id: string): Promise<boolean> {
        const productData = await this.productRepository.findOne({
            where: { id },
            relations: {
                pc_category: false,
            },
        });

        if (!productData) {
            throw new BadRequestException('Sản phẩm không tồn tại');
        }

        if (productData.isDeleted === false) {
            throw new BadRequestException('Sản phẩm không nằm trong thùng rác');
        }

        await this.productRepository.delete(id);

        return true;
    }
}
