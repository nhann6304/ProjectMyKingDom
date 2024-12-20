import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './apis/models/users/users.module';
import { AuthModule } from './apis/common/auth/auth.module';
import { ProductCategoriesModule } from './apis/models/product-categories/product-categories.module';
import { ProductsModule } from './apis/models/products/products.module';
import { ImagesModule } from './apis/common/images/images.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

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

    ImagesModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
