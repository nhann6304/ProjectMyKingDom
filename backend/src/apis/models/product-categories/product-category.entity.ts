import * as slug from "slug";
import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { IProductCategory } from "src/interfaces/models/product-categories.interface";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductsEntity } from "../products/product.entity";
import { UserEntity } from "../users/user.entity";

@Entity("product-categories")
export class ProductCategoryEntity extends ABaseModel implements IProductCategory {

    @Column('varchar', { length: 255, unique: true })
    pc_name: string;

    @Column('varchar', { length: 255, })
    pc_description: string;

    @Column('varchar', { length: 255, unique: true })
    pc_slug: string;

    @Column('boolean', { default: false })
    isDeleted: boolean

    @ManyToOne(() => ProductCategoryEntity, (category) => category.children, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "parentId" })
    parent: ProductCategoryEntity;

    @OneToMany(() => ProductCategoryEntity, (category) => category.parent, { onDelete: "CASCADE" })
    children: ProductCategoryEntity[];

    @OneToMany(() => ProductsEntity, (product) => product.pc_category)
    products: ProductsEntity[];

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'created_by' })
    createdBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'deleted_by' })
    deletedBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy: UserEntity;

    @BeforeInsert()
    @BeforeUpdate()
    async generateSlug() {
        this.pc_slug = slug(this.pc_name.toLocaleLowerCase(), "-");
    }

}
