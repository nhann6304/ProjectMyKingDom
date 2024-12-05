import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './auth.dto';
import { CREATE, OK } from 'src/core/response.core';
import { templateSuccessEmail } from 'src/config/email.config';

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

  @Post("send-email")
  @ApiOperation({ summary: "Test Send Email" })
  async sendEmail(@Body() data: any) {
    await this.authService.sendEmail("nh988805@gmail.com", "Hí lô", templateSuccessEmail("huynhthanhnhan632004@gmail.com"))
  }


}
