import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './token.entity';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/apis/models/users/users.module';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { OtpEntity } from '../otp/otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity, UserEntity, OtpEntity]),
    jwtConfig(),
    forwardRef(() => UsersModule),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }
