import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) { }

  async createToken(userId: string, email: string) {

    const payload = { user_id: userId, email };
    const token = await this.jwtService.signAsync(payload);

    const exitsToken = await this.tokenRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (exitsToken) {
      exitsToken.accessToken = token
      await this.tokenRepository.save(exitsToken);
      return token
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newToken = this.tokenRepository.create({
      accessToken: token,
      user,
    });

    await this.tokenRepository.save(newToken);
    return token;
  }

  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ where: { user_email: decoded.email } })
      return user
    } catch (error) {
      console.log("Token không hợp lệ hoặc hết hạn");
      throw new BadRequestException("Vui lòng đăng nhập lại");

    };
  };
}
