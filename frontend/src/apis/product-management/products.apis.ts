"use server";

import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers";
import {
    IBaseResponse,
    IGetManyItem,
    IQueries,
} from "@/interfaces/common/IBaseResponse.interface";
import { IProduct } from "@/interfaces/models/products.interface";
import { convertOjbToString } from "@/utils";

const TAG_NAME = {
    PRODUCT: " PRODUCT",
    PRODUCTS: " PRODUCTS",
};

export async function FindAllProduct(queries?: IQueries) {
    const result = await api<IBaseResponse<IGetManyItem<IProduct>>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PRODUCTS}/${CONST_API_COMMON.FIND_ALL}${convertOjbToString(queries)}`,
        options: {
            method: CONST_METHODS.GET,
            next: {
                tags: [TAG_NAME.PRODUCTS],
            },
        },
    });
    return result;
}


export async function FindProductBySlugCate(slug: string) {
    const result = await api<IBaseResponse<IGetManyItem<IProduct>>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PRODUCTS}/${CONST_API_COMMON.FIND_PRODUCT_SLUG_CATE}/${slug}`,
        options: {
            method: CONST_METHODS.GET,
            next: {
                tags: [TAG_NAME.PRODUCTS],
            },
        },
    });
    return result;
}

