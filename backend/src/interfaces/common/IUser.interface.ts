import { EGender } from "src/enums/EGender.enum";
import { ERole } from "src/enums/ERole.enum";
import { EStatusUser } from "src/enums/EStatusUser.enum";

export interface IUser {
    id?: string;
    user_first_name: string;   // Tên người dùng
    user_last_name: string;    // Họ người dùng
    user_role: ERole;          // Vai trò người dùng
    user_gender: EGender;          // Giới tính người dùng
    user_email: string;        // Email người dùng
    user_password: string;     // Mật khẩu của người dùng (mã hóa khi lưu)
    user_phone: number;        // Số điện thoại người dùng
    user_avatar?: string;      // Ảnh đại diện của người dùng
    user_status: EStatusUser;  // Trạng thái người dùng
    user_address?: IAddress[]; // Địa chỉ của người dùng
}


export interface IAddress {
    fullName: string; // Họ và tên
    country: string; // Quốc gia
    province: string; // Tỉnh/Thành phố
    district: string; // Quận/Huyện
    ward: string; // Phường/Xã
    address: string; // Địa chỉ cụ thể (số nhà, tên đường)
    postalCode?: string; // Mã bưu chính (không bắt buộc)
    phone: string; // Số điện thoại
}
