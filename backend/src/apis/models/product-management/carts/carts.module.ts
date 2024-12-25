import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/apis/common/token/token.module';
import { ProductCategoryEntity } from '../product-categories/product-category.entity';
import { ProductsEntity } from '../products/product.entity';
import { CartEntity } from './cart.entity';
import { ProductsModule } from '../products/products.module';
import { UserEntity } from '../../users/user.entity';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, UserEntity, CartEntity]),
    UsersModule,
    TokenModule,
    // ProductsModule
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule { }
