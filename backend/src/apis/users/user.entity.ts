import { ABaseModel } from 'src/abstracts/common/ABaseModel.abstracts';
import { ERole } from 'src/enums/ERole.enum';
import { EStatusUser } from 'src/enums/EStatusUser.enum';
import { IAddress, IUser } from 'src/interfaces/common/IUser.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { AddressEntity } from '../address/address.entity';

@Entity('users')
export class UserEntity extends ABaseModel implements IUser {

    @Column('varchar', { length: 255 })
    user_first_name: string;

    @Column('varchar', { length: 255 })
    user_last_name: string;

    @Column({ length: 100, nullable: false, unique: true })
    user_email: string;

    @Column({ length: 100, nullable: false })
    user_password: string;

    @Column({ type: "int" })
    user_phone: string;

    @Column({ type: "enum", enum: ERole, default: ERole.CUSTOMER })
    user_role: ERole;

    @Column({ type: "enum", enum: EStatusUser, default: EStatusUser.ACTIVE })
    user_status: EStatusUser;

    @OneToMany(() => AddressEntity, (address) => address.user, { cascade: true })
    user_address?: AddressEntity[];

    @Column({ nullable: true })
    user_avatar?: string;



}
