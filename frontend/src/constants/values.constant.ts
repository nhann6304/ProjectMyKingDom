import { EAgeGroup } from "@/enums/EAge.enum";
import { EGender } from "@/enums/EGender.enum";

export const CONST_VALUES = {
    TOKEN: "token",
};


export const CONST_GENDER_VALUES: Record<EGender, string> = {
    [EGender.FEMALE]: "Nam",
    [EGender.MALE]: "Nữ",
    [EGender.OTHER]: "Khác",
};

export const CONST_AGE_GROUP: Record<EAgeGroup, string> = {
    [EAgeGroup.UNDER_ONE_YEAR]: "Dưới 1 năm ",
    [EAgeGroup.THREE_TO_SIX_YEARS]: "Từ 3 đến 6 tháng",
    [EAgeGroup.ONE_TO_THREE_YEARS]: "Từ 1 tuổi đến 3 tuổi",
    [EAgeGroup.SIX_TO_TWELVE_YEARS]: "Từ 6 tuổi đến 10 tuôi",
    [EAgeGroup.OVER_TWELVE_YEARS]: "Hơn 12 tuổi",
};

export const CONST_PRICE_VALUES: Record<string, string> = {
    "0-200000": "Dưới 200.000 Đ",
    "200000-500000": "200.000 Đ - 500.000 Đ",
    "500000-1000000": "500.000 Đ - 1.000.000 Đ",
    "1000000-2000000": "1.000.000 Đ - 2.000.000 Đ",
    "2000000-4000000": "2.000.000 Đ - 4.000.000 Đ",
    "4000001-Infinity": "Trên 4.000.000 Đ",
};
