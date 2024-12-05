import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>) { }

  async createUsers(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({ user_first_name: "Nhan" });
    return this.usersRepository.save(newUser);
  }


  async findIsEmailExits(email: string,) {
    const result = await this.usersRepository.findOne({ where: { user_email: email } })
    if (result) {
      return false
    } else {
      return true
    }
  }

  async findIsPhone(phone: number,) {
    const result = await this.usersRepository.findOne({ where: { user_phone: phone } })
    if (result) {
      return false
    } else {
      return true
    }
  }

}
