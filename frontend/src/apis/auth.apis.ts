"use server";

import { cookies } from "next/headers";
import { CONST_APIS } from "../constants/apis.constant";
import { CONST_METHODS } from "../constants/methods.constant";
import { api } from "../helpers";
import {
    IBaseResponse,
    IResetPassData,
    IResponseLogin,
    IResponseSendEmail,
    IVerifyOtp,
} from "../interfaces/common/IBaseResponse.interface";
import { IUser } from "../interfaces/common/IUser.interface";
import { CONST_VALUES } from "../constants/values.constant";
import { revalidateTag } from "next/cache";

const USER = 'USER';


export async function register(payload: Partial<IUser>) {
    const result = await api<IBaseResponse<IUser>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.REGISTER}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });

    return result;
}

export async function login(
    payload: Pick<IUser, "user_email" | "user_password">
) {
    const result = await api<IBaseResponse<IResponseLogin>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGIN}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });

    if (result?.metadata?.token) {
        cookies().set(CONST_VALUES.TOKEN, result.metadata.token, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
    }
    return result;
}

export async function sendEmail(payload: Pick<IUser, "user_email">) {
    const result = await api<IBaseResponse<IResponseSendEmail>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.SEND_OTP}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });
    return result;
}

export async function verifyOtp({
    params,
    payload,
}: {
    params: string;
    payload: IVerifyOtp;
}) {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.VERIFY_OTP}/${params}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });
    return result;
}

export async function resetPassword(payload: IResetPassData) {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.RESET_PASSWORD}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });
    return result;
}

export async function logout() {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGOUT}`,
        options: {
            method: CONST_METHODS.GET,
        },
    });

    cookies().delete(CONST_VALUES.TOKEN)
    // revalidateTag(USER)

    return result;
}
