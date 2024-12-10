import { forwardRef, Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '../token/token.entity';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { UsersModule } from 'src/apis/models/users/users.module';
import { OtpEntity } from './otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpEntity, TokenEntity, UserEntity]),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule { }
