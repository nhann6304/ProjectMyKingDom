import { ABaseModel } from 'src/abstracts/common/ABaseModel.abstracts';
import { ImageEntity } from 'src/apis/common/images/image.entity';
import { ICompany } from 'src/interfaces/models/company.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductsEntity } from '../product-management/products/product.entity';
@Entity('companies')
export class CompanyEntity extends ABaseModel implements ICompany {
    @Column('varchar', { length: 255 })
    company_name: string;

    @ManyToOne(() => ImageEntity, (image) => image.companies, { nullable: true })
    @JoinColumn({ name: 'company_image_id' })
    company_thumb: ImageEntity;

    @OneToMany(() => ProductsEntity, (product) => product.prod_company)
    products: ProductsEntity[];
}
