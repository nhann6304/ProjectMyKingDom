import { extname } from "path";
import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { UserEntity } from "src/apis/models/users/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity("otp")
export class OtpEntity extends ABaseModel {
    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    otp: string;

    @Column()
    expiresAt: Date;

    @BeforeInsert()
    setExpirationTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        this.expiresAt = now;
    }

}
