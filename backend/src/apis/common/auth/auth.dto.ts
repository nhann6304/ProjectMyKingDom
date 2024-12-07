import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import { CONST_ERROR } from "src/constants";
import { EGender } from "src/enums/EGender.enum";
import { IUser } from "src/interfaces/common/IUser.interface";

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


