import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { privateEncrypt } from 'crypto';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../products/product.entity';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';
import { UserEntity } from '../../users/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartDetailsEntity)
    private readonly cartDetailsRepository: Repository<CartDetailsEntity>,
  ) { }

  async createCart({ user, productItem }: { user: UserEntity, productItem: ProductsEntity }) {
    const cart = await this.cartRepository.findOne({
      where: { cart_users: { id: user.id } },
      relations: ['cart_products', 'cart_products.product'],
    });

    let quantity = 1;

    if (!cart) {
      const newCart = this.cartRepository.create({ cart_products: [], cart_users: user });
      await this.cartRepository.save(newCart);

      const newDetailProduct = this.cartDetailsRepository.create({
        cart: newCart,
        product: productItem,
        quantity,
        total_price: productItem.prod_price * quantity,
      });
      await this.cartDetailsRepository.save(newDetailProduct);
    } else {
      const existingProduct = cart.cart_products.find((cp) => cp.product.id === productItem.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.total_price = existingProduct.quantity * productItem.prod_price;
        await this.cartDetailsRepository.save(existingProduct);
      } else {
        const newDetailProduct = this.cartDetailsRepository.create({
          cart: cart,
          product: productItem,
          quantity,
          total_price: productItem.prod_price * quantity,
        });
        await this.cartDetailsRepository.save(newDetailProduct);
        cart.cart_products.push(newDetailProduct);
      }
    }

    return await this.cartRepository.findOne({
      where: { cart_users: { id: user.id } },
      relations: ['cart_products', 'cart_products.product'],
    });
  }
}
