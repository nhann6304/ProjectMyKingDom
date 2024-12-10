import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { resetPasswordDto } from 'src/apis/common/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>) { }




  async findIsEmailExits(email: string,) {
    const result = await this.usersRepository.findOne({ where: { user_email: email } })
    if (result) {
      return false
    } else {
      return true
    }
  }

  async findIsPhoneExits(phone: number,) {
    const result = await this.usersRepository.findOne({ where: { user_phone: phone } })
    if (result) {
      return false
    } else {
      return true
    }
  }

  async findUserByField(key: keyof UserEntity, value: string | number) {
    const result = await this.usersRepository.findOne({ where: { [key]: value } });

    if (result) {
      return result;
    } else {
      throw new BadRequestException(`Không tìm thấy User với ${key} = ${value}`);
    }
  }


  async resetPassword({ user_id, newPassWord }: { user_id: string, newPassWord: string }) {
    const result = await this.usersRepository.update(user_id, { user_password: newPassWord });
    return result
  }



}
