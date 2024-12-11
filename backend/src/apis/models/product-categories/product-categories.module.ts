import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoryEntity } from './product-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { OtpModule } from 'src/apis/common/otp/otp.module';
import { TokenModule } from 'src/apis/common/token/token.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategoryEntity]),
    UsersModule,
    TokenModule,
  ],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService, AuthGuard, RoleGuard],
})
export class ProductCategoriesModule { }
