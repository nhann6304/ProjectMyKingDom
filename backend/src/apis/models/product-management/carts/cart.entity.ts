import { ABaseModel } from "src/abstracts/common/ABaseModel.abstracts";
import { IUser } from "src/interfaces/common/IUser.interface";
import { ICart } from "src/interfaces/models/cart.interface";
import { IProduct } from "src/interfaces/models/product.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { UserEntity } from "../../users/user.entity";
import { ProductsEntity } from "../products/product.entity";

@Entity("carts")
export class CartEntity extends ABaseModel implements ICart {

    @Column('int', { default: 1 })
    cart_quantity: number;

    @ManyToMany(() => ProductsEntity, (product) => product.prod_cart)
    @JoinTable()
    cart_product: IProduct[];

    @OneToOne(() => UserEntity, (user) => user.user_cart)
    @JoinColumn({ name: "user_id" })
    cart_users: IUser;

}
