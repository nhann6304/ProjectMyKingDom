import { findAllProductCate } from "@/apis/modules/product-management/product-categories.apis";
import { IProductCategory } from "@/interfaces/models/IProduct-categories.interface";
import BottomNav from "./bottom-nav/BottomNav";
import TopNavPublic from "./top-nav/TopNav";
import NavbarApi from "./NavbarApi";

export default async function NavClient() {
    const searchParams: any = {}

    if (searchParams && !searchParams?.limit) searchParams.limit = 10;
    if (searchParams && !searchParams?.page) searchParams.page = 1;
    if (searchParams && !searchParams?.isDeleted) searchParams.isDeleted = false;
    if (searchParams && !searchParams?.fields) {
        searchParams.fields = ["pc_name", "pc_slug", "pc_description"] as Array<
            keyof IProductCategory
        >;
    }

    const resultCate = await findAllProductCate(searchParams);

    return (
        <>
            <NavbarApi categories={resultCate} />
        </>

    );
}
