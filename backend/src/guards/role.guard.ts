import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/apis/common/token/token.service';
import { ERole } from 'src/enums/ERole.enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private tokenService: TokenService
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getRequest<Response>();

    const token = req.cookies.token;

    if (!token) {
      throw new BadRequestException("Vui lòng đăng nhập lại");
    }
    const result = await this.tokenService.verifyToken(token);

    if (result.user_role !== ERole.ADMIN) {
      throw new BadRequestException("Bạn không có quyền làm hành động này hãy quay lại");
    }

    return true;
  }
}
