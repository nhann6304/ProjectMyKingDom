import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/apis/common/token/token.module';
import { UserEntity } from '../../users/user.entity';
import { UsersModule } from '../../users/users.module';
import { ProductsEntity } from '../products/product.entity';
import { CartEntity } from './cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartDetailsModule } from '../cart-details/cart-details.module';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, UserEntity, CartEntity, CartDetailsEntity]),
    UsersModule,
    TokenModule,
    forwardRef(() => CartDetailsModule),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule { }
