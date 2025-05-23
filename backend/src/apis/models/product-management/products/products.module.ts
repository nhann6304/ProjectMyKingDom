import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './product.entity';
import { ProductCategoryEntity } from '../product-categories/product-category.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenModule } from 'src/apis/common/token/token.module';
import { UsersModule } from '../../users/users.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { CartsModule } from '../carts/carts.module';
import { CartEntity } from '../carts/cart.entity';
import { CartsService } from '../carts/carts.service';
import { CartDetailsModule } from '../cart-details/cart-details.module';
import { CartDetailsEntity } from '../cart-details/cart-details.entity';
import { ImageEntity } from 'src/apis/common/images/image.entity';
import { ImagesModule } from 'src/apis/common/images/images.module';
import { CompanyEntity } from '../../companys/company.entity';
import { CompanyModule } from '../../companys/companys.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, ProductCategoryEntity, CartEntity, CartDetailsEntity, ImageEntity, CompanyEntity]),
    UsersModule,
    ImagesModule,
    TokenModule,
    CartsModule,
    CompanyModule,
    CartDetailsModule,
    ProductCategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductCategoriesService, CartsService, AuthGuard, RoleGuard],
})
export class ProductsModule { }
