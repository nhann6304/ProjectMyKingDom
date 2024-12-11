import { UserEntity } from "src/apis/models/users/user.entity";
import { IBaseModel } from "src/interfaces/common/IBaseModel.interface";
import { IUser } from "src/interfaces/common/IUser.interface";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


export abstract class ABaseModel implements IBaseModel {
    @Column('uuid')
    @PrimaryGeneratedColumn('uuid') // Khóa chính
    id: string;

    @VersionColumn({ default: 1 })
    version: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}
