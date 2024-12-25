import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { privateEncrypt } from 'crypto';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../products/product.entity';
import { UserEntity } from '../../users/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>
  ) { }


  async findCart({ user }: { user: UserEntity }) {
    const findData = await this.cartRepository.findOne({
      where: { cart_users: user }
    })

    console.log(findData);

    return findData
  }


  async createCart({ user, product }: { user: UserEntity, product: ProductsEntity[] }) {

    const dataCreate = this.cartRepository.create({ cart_product: product, cart_users: user })

    const result = await this.cartRepository.save(dataCreate);

  }


}
