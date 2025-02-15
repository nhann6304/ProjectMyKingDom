import { findAllBLogCate } from "@/apis/product-management/product-categories.apis";
import { CONST_APIS, CONST_API_COMMON } from "@/constants/apis.constant";
import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import HomePageLayout from "@/layouts/public/home-page/HomePageLayout";
import { convertOjbToString } from "@/utils";

export default async function HomePage({ searchParams }: IPageProps) {
    if (searchParams && !searchParams?.limit) searchParams.limit = 10;
    if (searchParams && !searchParams?.page) searchParams.page = 1;
    if (searchParams && !searchParams?.isDeleted) searchParams.isDeleted = false;
    if (searchParams && !searchParams?.fields) {
        searchParams.fields = ["pc_name", "pc_slug", "pc_description"] as Array<keyof IProductCategory>;
    }

    // console.log("Haahaha::", searchParams);
    // if (searchParams && !searchParams?.fieldsWhereSelected) {
    //     searchParams.fields = JSON.stringify([
    //         "pc_name",
    //     ] as Array<keyof IProductCategory>)
    // }
    // console.log("Link nè:::", `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.PRODUCTS_CATEGORIES}/${CONST_API_COMMON.FIND_ALL}${convertOjbToString(searchParams)}`);
    const result = await findAllBLogCate(searchParams);
    console.log("result::", result);
    return (
        <HomePageLayout />

    )
}
