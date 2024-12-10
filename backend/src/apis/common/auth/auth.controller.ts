import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, OtpCodeDto, RegisterDto, resetPasswordDto } from './auth.dto';
import { CREATE, OK } from 'src/core/response.core';
import { templateEmailRegister } from 'src/constants/templates/registerEmail.contants';
import { Request, Response } from 'express';
import { CookieHelper } from 'src/helper/cookie.helper';
import { CONST_VAL } from 'src/constants/value.contants';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Get("get-me")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Lấy thông tin cá nhân" })
  async getMe(@Req() req: Request) {

    const user = await this.authService.getMe(req);

    return new OK({
      message: "Lấy thông tin cá nhân thành công",
      metadata: user
    })
  }


  @Get("Log-out")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Đăng xuất" })
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const result = this.authService.logout(req)
    if (result) {
      CookieHelper.clearCookie({
        name: CONST_VAL.TOKEN_NAME,
        res
      }).send(new OK({
        message: "Đăng xuất thành công"
      }))
    }

  }

  @Post("send-otp")
  @ApiOperation({ summary: "Gửi mã Otp đổi mật khẩu" })
  async sendOtp(
    @Body() resetData: resetPasswordDto,
    @Req() req: Request
  ) {
    const items = await this.authService.sendOptEmail(resetData, req);
    return new OK({
      message: "Mã xác nhận đã gửi về mail của bạn",
      metadata: items
    })
  }


  @Post("reset-password")
  @ApiOperation({ summary: "Thay đổi mật khẩu" })
  async resetPassword(
    @Body() otpData: OtpCodeDto,
  ) {

    const result = await this.authService.resetPassword(otpData);

    return new OK({
      message: "Ngon",
      metadata: otpData
    })
  }

} 
