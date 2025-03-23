import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { UpdateCartDetailDto } from '../cart-details/cart-details.dto';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';
import { ProductsEntity } from '../products/product.entity';
import { CartEntity } from './cart.entity';
import { IUser } from 'src/interfaces/common/IUser.interface';
import { AddCartDto } from './cart.dto';

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
  async addToCart({ req, addData }: { req: Request; addData: AddCartDto }) {
    const me = req['user'] as UserEntity;
    const id = addData.idProduct;
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }

    let quantity = 1;

    let cart = await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products', 'cart_products.product_detail'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        cart_products: [],
        cart_users: me,
        total_all_price: 0, // Khởi tạo tổng giá trị giỏ hàng
      });
      await this.cartRepository.save(cart);
    }

    const existingProduct = cart.cart_products.find(
      (cp) => cp.product_detail.id === findProduct.id,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.total_price =
        existingProduct.quantity * findProduct.prod_price_official;
      await this.cartDetailsRepository.save(existingProduct);
    } else {
      const newDetailProduct = this.cartDetailsRepository.create({
        cart_detail: cart,
        product_detail: findProduct,
        quantity,
        total_price: findProduct.prod_price_official * quantity,
      });
      await this.cartDetailsRepository.save(newDetailProduct);
      cart.cart_products.push(newDetailProduct);
    }

    //  Cập nhật total_all_price sau khi thêm sản phẩm
    cart.total_all_price = cart.cart_products.reduce(
      (total, product) => total + product.total_price,
      0,
    );
    await this.cartRepository.save(cart);

    return await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products'],
    });
  }

  async findAllCart({ req }: { req: Request }) {
    const me = req['user'] as UserEntity;
    const items = await this.cartRepository.findOne({
      where: { cart_users: { id: me?.id } }, // Điều kiện tìm theo userId
      relations: ['cart_products', 'cart_products.product_detail'], // Lấy giỏ hàng kèm sản phẩm
    });

    if (!items) {
      throw new BadRequestException('Không tìm thấy giỏ hàng của người dùng');
    }

    return {
      items,
    };
  }

  async updateToCart({
    payload,
    req,
  }: {
    payload: UpdateCartDetailDto;
    req: Request;
  }) {
    const me = req['user'] as IUser;

    // Tìm sản phẩm
    const findProduct = await this.productRepository.findOne({
      where: { id: payload.product_id },
    });
    if (!findProduct) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }

    // Tìm giỏ hàng của người dùng (Không tìm thấy thì báo lỗi ngay)
    const cart = await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products', 'cart_products.product_detail'],
    });
    if (!cart) {
      throw new BadRequestException('Không tìm thấy giỏ hàng');
    }

    // Tìm sản phẩm trong giỏ hàng
    let findCartDetail = await this.cartDetailsRepository.findOne({
      where: { product_detail: { id: findProduct.id } },
      relations: ['product_detail'],
    });

    if (!findCartDetail) {
      throw new BadRequestException('Sản phẩm chưa có trong giỏ hàng');
    }

    // Cập nhật số lượng và tổng giá
    findCartDetail.quantity = payload.quantity;
    findCartDetail.total_price =
      findCartDetail.quantity * findProduct.prod_price_official;

    // Lưu cập nhật vào database
    await this.cartDetailsRepository.save(findCartDetail);

    //  Cập nhật giá sản phẩm mới
    const updatedProduct = cart.cart_products.find(
      (product) => product.product_detail.id === findProduct.id,
    );

    if (updatedProduct) {
      updatedProduct.total_price = findCartDetail.total_price;
    }

    // Tính lại tổng giá giỏ hàng từ danh sách đã cập nhật
    cart.total_all_price = cart.cart_products.reduce(
      (total, product) => total + Number(product.total_price || 0),
      0,
    );

    // Lưu lại giỏ hàng vào database
    await this.cartRepository.save(cart);

    return true;
  }

  async deleteProductToCart({ id, req }: { id: string; req: Request }) {
    const me = req['user'] as UserEntity;

    await this.cartRepository.findOne({
      where: { cart_users: { id: me.id } },
      relations: ['cart_products', 'cart_products.product'],
    });

    await this.cartDetailsRepository.delete(id);

    return true;
  }
}
