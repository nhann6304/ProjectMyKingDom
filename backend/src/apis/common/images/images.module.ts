import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from 'src/apis/models/users/users.module';
import { TokenModule } from '../token/token.module';
import { ImageEntity } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.register({
      dest: "./upload"
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule { }
