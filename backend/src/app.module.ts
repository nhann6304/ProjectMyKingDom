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
import { CartDetailsModule } from './apis/models/product-management/cart-details/cart-details.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CONST_CONF_VAL } from './constants/value.contants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('mysql'),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Đảm bảo đường dẫn đến thư mục uploads
      serveRoot: '/uploads', // Đường dẫn truy cập từ phía client
    }),

    //Redis
    CacheModule.registerAsync({
      isGlobal: true, // Apply for microservice
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: configService.get(CONST_CONF_VAL.CACHE_CONF),
        });
        return {
          store: store,
          ttl: 30 * 24 * 60 * 60,
        };
      },
      inject: [ConfigService],
    }),

    //Auth
    UsersModule,
    AuthModule,

    //Product
    ProductCategoriesModule,
    ProductsModule,
    CartsModule,
    //
    ImagesModule,
    CartDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
