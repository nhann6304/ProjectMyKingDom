import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "../carts/cart.entity";
import { ProductsEntity } from "../products/product.entity";

@Entity("cart-detail")
export class CartDetailsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => CartEntity, (cart) => cart.cart_products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cart_id' })  // Tên cột ngoại khóa trong bảng CartDetails
    cart_detail: CartEntity;

    @ManyToOne(() => ProductsEntity, (product) => product.cartProducts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })  // Tên cột ngoại khóa trong bảng CartDetails
    product_detail: ProductsEntity;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;
}
