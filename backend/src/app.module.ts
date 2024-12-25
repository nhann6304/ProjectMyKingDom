import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './apis/models/users/users.module';
import { AuthModule } from './apis/common/auth/auth.module';
import { ProductsModule } from './apis/models/product-management/products/products.module';
import { ImagesModule } from './apis/common/images/images.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartsModule } from './apis/models/product-management/carts/carts.module';
import { ProductCategoriesModule } from './apis/models/product-management/product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>("mysql"),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  // Đảm bảo đường dẫn đến thư mục uploads
      serveRoot: '/uploads',  // Đường dẫn truy cập từ phía client
    }),


    //Auth
    UsersModule,
    AuthModule,

    //Product    
    ProductCategoriesModule,
    ProductsModule,
    CartsModule,
    //
    ImagesModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
