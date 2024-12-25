import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../users/user.entity';
import { CartEntity } from '../carts/cart.entity';
import { ProductsEntity } from '../products/product.entity';
import { CartDetailsEntity } from './cart-details.entity';
import { CartsModule } from '../carts/carts.module';
import { CartDetailsService } from './cart-details.service';
import { CartDetailsController } from './cart-details.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, UserEntity, CartEntity, CartDetailsEntity]),
    forwardRef(() => CartsModule),
  ],
  controllers: [CartDetailsController],
  providers: [CartDetailsService],
  exports: []
})
export class CartDetailsModule { }
