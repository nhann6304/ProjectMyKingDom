"use server"

import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers";
import { IBaseResponse, IGetManyItem, IQueries } from "@/interfaces/common/IBaseResponse.interface";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import { convertOjbToString } from "@/utils";



const TAG_NAME = {
    BLOG_CATEGORY: " BLOG_CATEGORY",
    BLOGS_CATEGORIES: " BLOGS_CATEGORIES",
};

export async function findAllBLogCate(queries?: IQueries) {
    const result = await api<IBaseResponse<IGetManyItem<IProductCategory>>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PRODUCTS_CATEGORIES}/${CONST_API_COMMON.FIND_ALL}${convertOjbToString(queries)}`,
        options: {
            method: CONST_METHODS.GET,
            next: {
                tags: [TAG_NAME.BLOGS_CATEGORIES]
            }
        }
    })
    return result
}

