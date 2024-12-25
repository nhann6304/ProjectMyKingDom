import { IUser } from "../common/IUser.interface";
import { IProduct } from "./product.interface";

export interface ICart {

    cart_quantity: number,

    cart_users: IUser,

    cart_product: IProduct[]

}