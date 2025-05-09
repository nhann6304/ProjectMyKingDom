import * as slug from 'slug';
import { ABaseModel } from 'src/abstracts/common/ABaseModel.abstracts';
import { EAgeGroup } from 'src/enums/EAge.enum';
import { IProduct } from 'src/interfaces/models/product.interface';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { ProductCategoryEntity } from '../product-categories/product-category.entity';
import { UserEntity } from '../../users/user.entity';
import { CartEntity } from '../carts/cart.entity';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';
import { EGender } from 'src/enums/EGender.enum';
import { ImageEntity } from 'src/apis/common/images/image.entity';
import { CompanyEntity } from '../../companys/company.entity';

@Entity('products')
export class ProductsEntity extends ABaseModel implements IProduct {
    @Column('varchar', { length: 255 })
    prod_name: string;

    @Column('varchar', { length: 255, nullable: true })
    prod_thumb: string;

    @ManyToOne(() => CompanyEntity, { nullable: false, eager: true })
    @JoinColumn({ name: 'prod_company' })
    prod_company: CompanyEntity;

    @Column('varchar', { length: 50, unique: true })
    prod_sku: string; // Mã hàng hóa SKU T01160

    @Column('varchar', { length: 100, unique: true })
    prod_slug: string;

    @Column({
        type: "simple-array",
        nullable: true,
    })
    prod_gender: EGender[];


    @Column('decimal', { precision: 10, scale: 0 })
    prod_price: number;

    @Column('decimal', { precision: 10, scale: 0 })
    prod_price_official?: number;

    @Column('varchar', { length: 1000 })
    prod_description: string;

    @Column('int', { default: 1 })
    prod_quantity: number;

    @Column('enum', { enum: EAgeGroup, nullable: true })
    prod_agePlay: EAgeGroup;

    @Column('varchar', { length: 50 })
    prod_nation: string;

    @Column('varchar', { length: 50, nullable: true })
    shipping_code?: string;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    discount: number;

    @ManyToMany(() => ImageEntity, (image) => image.products)
    @JoinTable({
        name: 'image_relations',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id' },
    })
    prod_thumbnails?: ImageEntity[];


    @ManyToOne(() => ProductCategoryEntity, (category) => category.products, {
        nullable: false,
    })
    @JoinColumn({ name: 'category_id' })
    pc_category: ProductCategoryEntity;

    @ManyToMany(() => CartEntity, (cart) => cart.cart_products, {
        nullable: true,
    })
    prod_cart: CartEntity | null;

    @OneToMany(
        () => CartDetailsEntity,
        (cartProduct) => cartProduct.product_detail,
    )
    cartProducts: CartDetailsEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async generateSlug() {
        this.prod_slug = slug(this.prod_name.toLocaleLowerCase(), '-');
    }
}
