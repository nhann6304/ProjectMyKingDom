import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/apis/models/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { OtpService } from '../otp/otp.service';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    TokenModule,
    OtpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule { }
