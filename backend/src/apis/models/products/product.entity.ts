import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { IProduct } from "src/interfaces/models/product.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm";
import * as slug from "slug";
import { ProductCategoryEntity } from "../product-categories/product-category.entity";

@Entity("products")
export class ProductsEntity extends ABaseModel implements IProduct {
    @Column('varchar', { length: 255 })
    prod_name: string;

    @Column('varchar', { length: 255 })
    prod_thumb: string;

    @Column('varchar', { length: 50 }) // Công ty vd TOY MONSTER
    prod_company: string;

    @Column('varchar', { length: 50, unique: true })
    prod_sku: string; // Mã hàng hóa SKU T01160

    @Column('varchar', { length: 100, unique: true })
    prod_slug: string;

    @Column('decimal', { precision: 10, scale: 2 })
    prod_price: number;

    @Column('varchar', { length: 100 })
    prod_description: string;

    @Column('int')
    prod_quantity: number;

    @Column('int')
    prod_agePlay: number;

    @Column('varchar', { length: 50 })
    prod_nation: string; // Quốc gia

    @Column('varchar', { length: 50, nullable: true })
    shipping_code?: string;

    @Column('decimal', { precision: 5, scale: 2 })
    discount: number;

    @ManyToOne(() => ProductCategoryEntity, (category) => category.products, { nullable: false })
    pc_category: ProductCategoryEntity;

    @BeforeInsert()
    @BeforeUpdate()
    async generateSlug() {
        this.prod_slug = slug(this.prod_name.toLocaleLowerCase(), "-");
    }
}
