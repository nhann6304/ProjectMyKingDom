"use server";
import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers";
import {
    IBaseResponse,
    IGetManyItem
} from "@/interfaces/common/IBaseResponse.interface";
import { ICart, ICartDetail } from "@/interfaces/models/carts.interface";

const TAG_NAME = {
    CART: "CART",
    CARTS: " CARTS",
};

export async function FindAllCarts(userId?: string) {
    const result = await api<IBaseResponse<IGetManyItem<ICart>>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.CARTS}/${CONST_API_COMMON.FIND_ALL}`,
        options: {
            method: CONST_METHODS.GET,
            next: {
                tags: [TAG_NAME.CARTS],
            },
        },
    });
    return result;
}

// export async function FindProductBySlugCate(slug: string, queries?: IQueries) {
//     const result = await api<IBaseResponse<IGetManyItem<IProduct>>>({
//         url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PRODUCTS}/${CONST_API_COMMON.FIND_PRODUCT_SLUG_CATE}/${slug}${convertOjbToString(queries)}`,
//         options: {
//             method: CONST_METHODS.GET,
//             next: {
//                 tags: [TAG_NAME.PRODUCTS],
//             },
//         },
//     });
//     return result;
// }
