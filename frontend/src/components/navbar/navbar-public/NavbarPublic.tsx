import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import BottomNav from "./bottom-nav/BottomNav";
import TopNavPublic from "./top-nav/TopNav";
import { findAllProductCate } from "@/apis/product-management/product-categories.apis";
import { useUserCurrent } from "@/stores/userCurrent/userCurrent";

export default async function NavbarPublic() {
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
        <div>
            {/* TOP NAV */}
            <TopNavPublic />
            {/* CENTER NAV */}
            <BottomNav categories={resultCate} />
            {/* BOTTOM NAV */}
            {/* Bottom Nav Public */}
        </div>
    )
}
