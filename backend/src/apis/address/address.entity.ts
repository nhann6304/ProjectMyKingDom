import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { IAddress } from "src/interfaces/common/IUser.interface";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "../users/user.entity";


@Entity('address')
export class AddressEntity extends ABaseModel implements IAddress {
    @Column({ length: 255 })
    fullName: string;

    @Column({ length: 100 })
    country: string;

    @Column({ length: 100 })
    province: string;

    @Column({ length: 100 })
    district: string;

    @Column({ length: 100 })
    ward: string;

    @Column({ length: 255 })
    address: string;

    @Column({ length: 20, nullable: true })
    postalCode?: string;

    @Column({ length: 20 })
    phone: string;

    @ManyToOne(() => UserEntity, (user) => user.user_address, { onDelete: "CASCADE" })
    user: UserEntity
}