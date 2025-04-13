"use server";
import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers";
import { IBaseResponse, IGetManyItem, IQueries } from "@/interfaces/common";
import { ICompany } from "@/interfaces/models/ICompany";
import { convertOjbToString } from "@/utils";

const TAG_NAME = {
    COMPANY: "company",
    COMPANIES: "companies",
};

export async function FindAllCompanies(queries: IQueries) {
    const result = await api<IBaseResponse<IGetManyItem<ICompany>>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.COMPANIES}/${CONST_API_COMMON.FIND_ALL
            }${convertOjbToString(queries)}`,
        options: {
            method: CONST_METHODS.GET,
            next: {
                tags: [TAG_NAME.COMPANIES],
            },
        },
    });

    return result;
}
