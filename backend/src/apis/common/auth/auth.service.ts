import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { UsersService } from 'src/apis/models/users/users.service';
import { emailConfig } from 'src/config/email.config';
import * as nodemailer from "nodemailer"
import { templateEmailRegister } from 'src/constants/templates/registerEmail.contants';
import { SendEmailHelper } from 'src/helper/sendEmail.helper';
import { PasswordHelper } from 'src/helper/hashPassWord.helper';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
        private tokenService: TokenService,
    ) { }
    async register(dataUser: RegisterDto) {
        const isEmail = await this.userService.findIsEmailExits(dataUser.user_email);
        const isPhone = await this.userService.findIsPhoneExits(dataUser.user_phone);
        if (!isEmail) {
            throw new BadRequestException("Email đã tồn tại trong hệ thống");
        }

        if (!isPhone) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống");
        }

        const hashPassword = await PasswordHelper.hashPassword(dataUser.user_password);

        const userItem = this.userRepository.create({ ...dataUser, user_password: hashPassword });
        const savedUser = await this.userRepository.save(userItem);

        try {
            await SendEmailHelper.sendEmail(
                userItem.user_email,
                "Xác nhận tài khoản khách hàng",
                templateEmailRegister(userItem.user_last_name, userItem.user_email)
            );
        } catch (error) {
            throw new BadRequestException(`Không gửi được thông tin đến mail ${savedUser.user_email}`);
        }
        return savedUser;
    };

    async login(loginData: LoginDto, res: Response) {
        const user = await this.userService.findUserByEmail(loginData.user_email);

        const isPassWord = await PasswordHelper.comparePassword(user.user_password, loginData.user_password);
        if (!isPassWord) {
            throw new BadRequestException("Email hoặc mật khẩu không chính xác.");
        }

        const token = await this.tokenService.createToken(user.id, user.user_email)

        return {
            token,
            user
        }
    }
}
