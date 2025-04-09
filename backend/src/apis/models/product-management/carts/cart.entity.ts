import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { ICart, ICartDetail } from "src/interfaces/models";
import { Entity, OneToMany, OneToOne, JoinColumn, Column } from "typeorm";
import { UserEntity } from "../../users/user.entity";
import { CartDetailsEntity } from "../cart-details/cart-details.entity";


@Entity("carts")
export class CartEntity extends ABaseModel implements ICart {
    @OneToMany(() => CartDetailsEntity, (cartProduct) => cartProduct.cart_detail)
    cart_products: ICartDetail[];

    @OneToOne(() => UserEntity, (user) => user.user_cart)
    @JoinColumn({ name: "user_id" })
    cart_users: UserEntity;

    @Column('decimal', { precision: 10, scale: 0 })
    total_all_price: number;
}