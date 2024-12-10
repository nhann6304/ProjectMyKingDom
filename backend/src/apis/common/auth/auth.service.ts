import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/models/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, OtpCodeDto, RegisterDto, resetPasswordDto } from './auth.dto';
import { UsersService } from 'src/apis/models/users/users.service';
import { emailConfig } from 'src/config/email.config';
import * as nodemailer from "nodemailer"
import { templateEmailRegister } from 'src/constants/templates/registerEmail.contants';
import { SendEmailHelper } from 'src/helper/sendEmail.helper';
import { PasswordHelper } from 'src/helper/hashPassWord.helper';
import { TokenService } from '../token/token.service';
import { Request, Response } from 'express';
import { IUser } from 'src/interfaces/common/IUser.interface';
import { CONST_VAL } from 'src/constants/value.contants';
import { CookieHelper } from 'src/helper/cookie.helper';
import { calcNumberOtp } from 'src/utils/otp.helper';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
        private tokenService: TokenService,
        private otpService: OtpService,
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
                {
                    subject: "Xác nhận tài khoản khách hàng",
                    user_email: userItem.user_email,
                    templateEmail: templateEmailRegister(userItem.user_last_name, userItem.user_email),
                }
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

    async getMe(req: Request) {
        const dataUser = req['user'] as IUser;
        if (!dataUser) return undefined;

        delete dataUser.user_password

        return dataUser

    }

    async logout(req: Request) {
        const user = await this.getMe(req);
        if (!user) {
            throw new BadRequestException("Đăng xuất thất bại");
        }
        req['user'] = null
        return true
    }

    async sendOptEmail(resetData: resetPasswordDto, req: Request) {
        const numberOtp = calcNumberOtp
        const user = await this.userService.findUserByEmail(resetData.user_email);

        const result = await this.otpService.CreateOtp({ numberOtp, user });
        if (result) {
            try {
                await SendEmailHelper.sendEmail({
                    subject: "Xác nhận đổi mật khẩu",
                    user_email: resetData.user_email,
                    templateEmail: `<h1>Hello opt đổi mật khẩu của bạn là <b>${numberOtp}</b></h1>`
                });
            } catch (error) {
                throw new BadRequestException(`Không gửi được thông tin đến mail ${resetData.user_email}`);
            }
        }

        return result
    }

    async resetPassword(otpData: OtpCodeDto) {
        const optUser = await this.otpService.verifyOtp(otpData.user_id);
        // Kiểm tra mã otp
        const isOtp = await PasswordHelper.comparePassword(optUser.otp, otpData.otp);

        if (!isOtp) {
            throw new BadRequestException("Mã opt không trùng khớp hãy kiểm tra email của bạn!!!");
        }

        return true
    }
}

