import { IUser } from '../common/IUser.interface';
import { IProduct } from './products.interface';

export interface ICart {
    id?: string;
    cart_users: IUser;
    total_all_price: number;
    cart_products: ICartDetail[];
}


export interface ICartDetail {
    cart_detail: ICart;
    product_detail: IProduct;
    quantity: number;
    total_price: number;
}


