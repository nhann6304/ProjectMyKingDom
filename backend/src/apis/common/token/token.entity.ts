import { ABaseModel } from 'src/abstracts/common/ABaseModel.abstracts';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity('tokens')
export class TokenEntity extends ABaseModel {
    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    accessToken: string;
}
