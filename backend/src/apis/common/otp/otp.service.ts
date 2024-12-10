import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordHelper } from 'src/helper/hashPassWord.helper';
import { OtpEntity } from './otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
  ) { }

  async CreateOtp({ user, numberOtp }: { user: UserEntity, numberOtp: string }) {
    const hashOtp = await PasswordHelper.hashPassword(numberOtp);

    // Tìm OTP cũ của người dùng trong database
    const exitsOtp = await this.otpRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    const now = new Date();

    if (exitsOtp) {
      if (exitsOtp.expiresAt < now) {
        exitsOtp.otp = hashOtp;
        exitsOtp.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.otpRepository.save(exitsOtp);
        return exitsOtp;
      } else {
        throw new BadRequestException(
          'OTP đã được gửi trước đó. Vui lòng chờ OTP cũ hết hạn trước khi yêu cầu mã mới.'
        );
      }
    }

    const newOtp = this.otpRepository.create({
      otp: hashOtp,
      user,
    });

    return await this.otpRepository.save(newOtp);
  }
  //
  async verifyOtp(user_id: string) {
    const now = new Date();

    const userOtp = await this.otpRepository.findOne({
      where: { user: { id: user_id } },
      relations: ['user'],
    })

    if (!userOtp) {
      throw new BadRequestException("Người dùng không tồn tại trong hệ thống");
    }

    if (userOtp.expiresAt < now) {
      throw new BadRequestException("Mã xác thực hết hạn vui lòng thử lại")
    }

    delete userOtp.user.user_password;


    return userOtp
  }
  //

  async deletedOtp(user_id: string) {

    const isOtp = await this.otpRepository.findOne({
      where: { user: { id: user_id } },
      relations: ["user"]
    })

    if (!isOtp) {
      throw new BadRequestException("Người dùng không tồn tại");
    }

    const result = await this.otpRepository.delete(isOtp.id);

    return result
  }


}
