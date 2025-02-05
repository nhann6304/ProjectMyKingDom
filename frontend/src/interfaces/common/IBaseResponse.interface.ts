import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IUser } from "./IUser.interface";

export interface IQueries<T = any> {
    limit?: number;
    page?: number;
    fields?: Array<T>
    isDeleted?: string | boolean;
    // sortBy?: string;
    // sortChildrenBy?: string;
    // sortDir?: string | TDirectionSort;
    // searchBy?: string;
    // searchVal?: string;
    // filterBy?: string;
    // filterVal?: string;
    fieldsWhereSelected?: Array<keyof T> | any;
    fieldsWhereSelectedValue?: Array<string>;
    [key: string]: string | number | boolean | any;
}


export interface IPageProps {
    params: { id?: string; slug?: string;[key: string]: string | undefined };
    searchParams: IQueries;
}

export interface IBaseResponse<T> {
    message: string;
    metadata?: T;
    statusCode?: StatusCodes;
    reasonStatusCode?: ReasonPhrases;
}

export interface IBaseModel {
    id: string,
    version: number,
    createdAt: Date,
    updatedAt: Date
}

export interface IResponseLogin {
    token: string;
    user: IUser;
}

export interface IResponseSendEmail {
    user: IUser,
    otp: string
}


export interface IVerifyOtp {
    otp: string,
}

export interface IResetPassData {
    user_id?: string,
    user_password: string,
    confirm_password: string
}