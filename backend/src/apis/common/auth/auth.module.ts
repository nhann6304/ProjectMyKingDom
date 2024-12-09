import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/apis/models/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot(),
    UsersModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
