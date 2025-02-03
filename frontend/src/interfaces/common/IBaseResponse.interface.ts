import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IUser } from "./IUser.interface";

export interface IBaseResponse<T> {
    message: string;
    metadata?: T;
    statusCode?: StatusCodes;
    reasonStatusCode?: ReasonPhrases;
}

export interface IResponseLogin {
    token: string;
    user: IUser;
}

export interface IResponseSendEmail {
    user: IUser,
    otp: string
}