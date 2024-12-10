import { BadGatewayException, BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/apis/common/token/token.service';
import { CONST_VAL } from 'src/constants/value.contants';
import { CookieHelper } from 'src/helper/cookie.helper';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService
  ) { }

  async canActivate(
    context: ExecutionContext,): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getRequest<Response>();


    const token = req.cookies.token;

    if (!token) {
      throw new BadRequestException("Vui lòng đăng nhập lại");
    }

    const result = await this.tokenService.verifyToken(token);

    if (!result) {
      CookieHelper.clearCookie({ name: CONST_VAL.TOKEN_NAME, res })
      return false
    }

    req['user'] = result

    return true
  };
}
