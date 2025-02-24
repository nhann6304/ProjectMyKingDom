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

export const CONST_AGE_GROUP: Record<keyof typeof EAgeGroup, string> = {
    ...EAgeGroup,
};


