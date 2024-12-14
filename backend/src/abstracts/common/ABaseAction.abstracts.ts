import { UserEntity } from "src/apis/models/users/user.entity";
import { IBaseModelAction } from "src/interfaces/common/IBaseAction.interface";
import { IBaseModel } from "src/interfaces/common/IBaseModel.interface";
import { IUser } from "src/interfaces/common/IUser.interface";
import { Column, JoinColumn, ManyToOne } from "typeorm";


export abstract class ABaseAction implements IBaseModelAction {

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'created_by' })
    createdBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'deleted_by' })
    deletedBy: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updatedBy: UserEntity;

    @Column('boolean', { default: false })
    isDeleted: boolean

}
