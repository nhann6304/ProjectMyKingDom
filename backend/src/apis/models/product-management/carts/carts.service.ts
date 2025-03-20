import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';
import { ProductsEntity } from '../products/product.entity';
import { CartEntity } from './cart.entity';
import { UpdateCartDetailDto } from '../cart-details/cart-details.dto';
import { AQueries } from 'src/abstracts/common/ABaseQueries.abstracts';
import { UtilConvert } from 'src/utils/convert.ultils';
import { UtilORM } from 'src/utils/orm.uutils';
import { IUser } from 'src/interfaces/common/IUser.interface';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartDetailsEntity)
    private readonly cartDetailsRepository: Repository<CartDetailsEntity>,
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) { }
  async addToCart({ req, id }: { req: Request, id: string }) {
    const me = req['user'] as UserEntity;
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new BadRequestException("Không tìm thấy sản phẩm");
    }

    let quantity = 1;

    const cart = await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products', 'cart_products.product_detail'],
    });


    if (!cart) {
      const newCart = this.cartRepository.create({ cart_products: [], cart_users: me });
      await this.cartRepository.save(newCart);

      const newDetailProduct = this.cartDetailsRepository.create({
        cart_detail: newCart,
        product_detail: findProduct,
        quantity,
        total_price: findProduct.prod_price * quantity,
      });
      await this.cartDetailsRepository.save(newDetailProduct);
    } else {
      const existingProduct = cart.cart_products.find((cp) => cp.product_detail.id === findProduct.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.total_price = existingProduct.quantity * findProduct.prod_price;
        await this.cartDetailsRepository.save(existingProduct);
      } else {
        const newDetailProduct = this.cartDetailsRepository.create({
          cart_detail: cart,
          product_detail: findProduct,
          quantity,
          total_price: findProduct.prod_price * quantity,
        });
        await this.cartDetailsRepository.save(newDetailProduct);
        cart.cart_products.push(newDetailProduct);
      }
    }

    return await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products'],
    });
  }

  async updateToCart({ payload }: { payload: UpdateCartDetailDto }) {
    const findProduct = await this.productRepository.findOne({ where: { id: payload.product_id } });

    if (!findProduct) {
      throw new BadRequestException("Không tìm thấy sản phẩm");
    }

    const findCartDetail = await this.cartDetailsRepository.findOne({
      where: { product_detail: { id: findProduct.id } },
      relations: ['product_detail'],
    });

    findCartDetail.quantity = payload.quantity;
    findCartDetail.total_price = findCartDetail.quantity * findProduct.prod_price;

    await this.cartDetailsRepository.save(findCartDetail)

    return true
  }

  async findAllCart(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { cart_users: { id: userId } }, // Điều kiện tìm theo userId
      relations: ["cart_products", "cart_products.product_detail"], // Lấy giỏ hàng kèm sản phẩm
    });

    if (!cart) {
      throw new BadRequestException("Không tìm thấy giỏ hàng của người dùng");
    }

    return cart;
  }


  async deleteProductToCart({ id, req }: { id: string, req: Request }) {
    const me = req['user'] as UserEntity

    await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products', 'cart_products.product'],
    });

    await this.cartDetailsRepository.delete(id);

    return true
  }

}