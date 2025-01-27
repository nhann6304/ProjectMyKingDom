"use server"

import { cookies } from "next/headers";
import { CONST_APIS } from "../constants/apis.constant";
import { CONST_METHODS } from "../constants/methods.constant";
import { api } from "../helpers";
import { IBaseResponse, IResponseLogin } from "../interfaces/common/IBaseResponse.interface";
import { IUser } from "../interfaces/common/IUser.interface";
import { CONST_VALUES } from "../constants/values.constant";

export async function login(payload: Pick<IUser, "user_email" | "user_password">) {
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
            maxAge: 15 * 24 * 60 * 60 * 1000  // 15 ngày
        })
    }

    return result
}