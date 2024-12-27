import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/user.entity";
import { CartDetailsEntity } from "../cart-details/cart-details.entity";
import { ICart } from "src/interfaces/models/cart.interface";

@Entity("carts")
export class CartEntity implements ICart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => CartDetailsEntity, (cartProduct) => cartProduct.cart_detail)
    cart_products: CartDetailsEntity[];

    @OneToOne(() => UserEntity, (user) => user.user_cart)
    @JoinColumn({ name: "user_id" })
    cart_users: UserEntity;
}
