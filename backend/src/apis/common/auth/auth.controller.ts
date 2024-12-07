import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { CREATE, OK } from 'src/core/response.core';
import { templateEmailRegister } from 'src/constants/templates/registerEmail.contants';

@Controller('auth')
@ApiTags("Auth")

export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("register")
  @ApiOperation({ summary: 'Đăng ký' })
  async register(@Body() register: RegisterDto) {
    const items = await this.authService.register(register);

    return new CREATE({
      message: "Tạo tài khoản thành công",
      metadata: items
    })
  }

  @Post("login")
  @ApiOperation({ summary: "Đăng nhập" })
  async login(@Body() loginData: LoginDto) {
    const items = await this.authService.login(loginData)
    return new OK({
      message: "Lia lia"
    })
  }
}
