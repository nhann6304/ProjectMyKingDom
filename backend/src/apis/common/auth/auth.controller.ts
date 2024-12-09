import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { CREATE, OK } from 'src/core/response.core';
import { templateEmailRegister } from 'src/constants/templates/registerEmail.contants';
import { Response } from 'express';
import { CookieHelper } from 'src/helper/cookie.helper';
import { CONST_VAL } from 'src/constants/value.contants';

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
  async login(
    @Body() loginData: LoginDto,
    @Res() res: Response
  ) {
    const items = await this.authService.login(loginData, res);

    return CookieHelper.setCookieToken({
      res,
      data: items.token,
      name: CONST_VAL.TOKEN_NAME
    }).send(
      new OK({
        message: "Đăng nhập thành công",
        metadata: items
      })
    )
  }
}
