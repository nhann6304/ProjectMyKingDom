import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import { CONST_ERROR } from "src/constants";
import { EGender } from "src/enums/EGender.enum";
import { IUser } from "src/interfaces/common/IUser.interface";
import { OtpEntity } from "../otp/otp.entity";

export class RegisterDto implements Partial<IUser> {
    @ApiProperty({ default: "Huỳnh" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Họ") })
    user_first_name: string;

    @ApiProperty({ default: "Nhân" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Tên") })
    user_last_name: string;

    @ApiProperty({ default: "0908117147" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Số điện thoại") })
    @IsMobilePhone('vi-VN')
    user_phone: number;

    @ApiProperty({ default: EGender.MALE })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Giới tính") })
    user_gender: EGender;

    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Email") })
    @IsEmail({}, { message: 'Email không hợp lệ, vui lòng kiểm tra lại!' })
    user_email: string;

    @ApiProperty({ default: "thanhnhan200463" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Mật khẩu") })
    user_password: string;
}


export class LoginDto implements Pick<IUser, "user_email" | "user_password"> {
    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Email") })
    @IsEmail({}, { message: 'Email không hợp lệ, vui lòng kiểm tra lại!' })
    user_email: string;

    @ApiProperty({ default: "thanhnhan200463" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Mật khẩu") })
    user_password: string;
}

export class resetPasswordSendMailDto implements Pick<IUser, "user_email"> {
    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Email") })
    user_email: string;
}

export class OtpCodeDto implements Pick<OtpEntity, "otp"> {
    @ApiProperty({ type: "string" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Otp") })
    otp: string;
}


export class resetPasswordDto implements Pick<IUser, "user_password"> {
    @ApiProperty({ default: "17f20b51-df1b-42cf-a0e4-3f54523e9c89" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Người dùng") })
    user_id: string;

    @ApiProperty({ default: "thanhnhan200463" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Mật khẩu mới") })
    user_password: string;

    @ApiProperty({ default: "thanhnhan200463" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Xác nhận mật khẩu mới") })
    confirm_password: string
}
// Phần Guest

export class createGuestDto implements Partial<IUser> {

    user_first_name?: string;

    user_last_name?: string;

    @ApiProperty({ default: "huynhthanhnhan632004@gmail.com" })
    @IsNotEmpty({ message: CONST_ERROR.FIELD_NOT_EMPTY("Email") })
    user_guest_id?: string;
}


