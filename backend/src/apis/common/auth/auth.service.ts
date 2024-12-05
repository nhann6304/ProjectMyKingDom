import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './auth.dto';
import { UsersService } from 'src/apis/models/users/users.service';
import { PasswordConfig } from 'src/helper/hashPassWord.helper';
import { emailConfig } from 'src/config/email.config';
import * as nodemailer from "nodemailer"

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService
    ) { }


    async register(dataUser: RegisterDto) {
        const isEmail = await this.userService.findIsEmailExits(dataUser.user_email);
        const isPhone = await this.userService.findIsPhone(dataUser.user_phone);
        if (!isEmail) {
            throw new BadRequestException("Email đã tồn tại trong hệ thống");
        }

        if (!isPhone) {
            throw new BadRequestException("Số điện thoại đã tồn tại trong hệ thống");
        }

        const hashPassword = await PasswordConfig.hashPassword(dataUser.user_password);

        const userItem = this.userRepository.create({ ...dataUser, user_password: hashPassword });
        return this.userRepository.save(userItem)
    }

    async sendEmail(user_email: string, subject: string, templateEmail: any) {
        const transport = emailConfig();

        const options: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER_SEND,
            to: user_email,
            subject: subject, // Tiêu đề email,
            html: templateEmail
        };

        try {
            await transport.sendMail(options);
        } catch (error) {
            throw new BadRequestException(error);
        }

    }


}
