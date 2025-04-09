import { ABaseAction } from "src/abstracts/common/ABaseAction.abstracts";
import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { CompanyEntity } from "src/apis/models/companys/company.entity";
import { ProductsEntity } from "src/apis/models/product-management/products/product.entity";
import { UserEntity } from "src/apis/models/users/user.entity";
import { IImage } from "src/interfaces/common/IImages.interface";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity("images")
export class ImageEntity extends ABaseModel implements IImage {
    @Column({ length: 255 })
    img_key: string;

    @Column('text', { nullable: true })
    img_path: string;

    @Column('text')
    img_url: string;

    @Column({ length: 100 })
    img_alt: string;

    @Column({ length: 100 })
    img_format: string;

    @Column('int')
    img_size: number;

    @Column('int')
    img_width: number;

    @Column('int')
    img_heigh: number;

    @ManyToMany(() => ProductsEntity, (product) => product.prod_thumbnails)
    products: ProductsEntity[];

    @OneToMany(() => CompanyEntity, (company) => company.company_thumb)
    companies: CompanyEntity[];
}


