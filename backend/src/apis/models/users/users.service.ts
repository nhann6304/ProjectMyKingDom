import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findUserByEmail(email: string,) {
    const result = await this.usersRepository.findOne({ where: { user_email: email } })
    if (result) {
      return result
    } else {
      throw new BadRequestException(`Không tìm thấy User có email ${email}`)
    }
  }

}
