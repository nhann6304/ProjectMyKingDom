"use server";
import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers";
import {
    IBaseResponse,
    IGetManyItem,
} from "@/interfaces/common/IBaseResponse.interface";
import { ICartItemChange } from "@/interfaces/common/ICart.interface";
import { ICart } from "@/interfaces/models/ICarts.interface";

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

export async function UpdateCart(payload: ICartItemChange) {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.CARTS}/${CONST_API_COMMON.UPDATE}`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
        },
    });

    return result;
}

export async function DeletedProdCart(idProduct: string) {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.CARTS}/${CONST_API_COMMON.DELETE}/${idProduct}`,
        options: {
            method: CONST_METHODS.DELETE,
        },
    });

    return result;
}

export async function AddProductCart(payload: ICartItemChange) {
    const result = await api<IBaseResponse<any>>({
        url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.CARTS}/${CONST_API_COMMON.ADD}-to-cart`,
        options: {
            method: CONST_METHODS.POST,
            body: JSON.stringify(payload),
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
