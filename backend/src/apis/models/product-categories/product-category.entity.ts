import * as slug from "slug";
import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { IProductCategory } from "src/interfaces/models/product-categories.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProductsEntity } from "../products/product.entity";

@Entity("product-categories")
export class ProductCategoryEntity extends ABaseModel implements IProductCategory {

    @Column('varchar', { length: 255, unique: true })
    pc_name: string;

    @Column('varchar', { length: 255, unique: true })
    pc_description: string;

    @Column('varchar', { length: 255, unique: true })
    pc_slug: string;

    @ManyToOne(() => ProductCategoryEntity, (category) => category.children, { nullable: true })
    parent: ProductCategoryEntity;

    @OneToMany(() => ProductCategoryEntity, (category) => category.parent)
    children: ProductCategoryEntity[];

    @OneToMany(() => ProductsEntity, (product) => product.pc_category)
    products: ProductsEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async generateSlug() {
        this.pc_slug = slug(this.pc_name.toLocaleLowerCase(), "-");
    }

}
