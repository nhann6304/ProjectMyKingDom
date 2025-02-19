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
        searchParams.fields = ["pc_name", "pc_slug", "pc_description"] as Array<
            keyof IProductCategory
        >;
    }

    const resultCate = await findAllBLogCate(searchParams);

    return <HomePageLayout categories={resultCate} />;
}
