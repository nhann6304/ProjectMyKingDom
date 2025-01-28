import { EGender } from "@/enums/EGender.enum";

export const CONST_VALUES = {
    TOKEN: 'token',
};

export const CONST_GENDER_VALUES: Record<EGender, string> = {
    [EGender.FEMALE]: "Nam",
    [EGender.MALE]: "Nữ",
    [EGender.OTHER]: "Khác",
}
