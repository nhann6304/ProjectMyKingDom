import "./style.scss";
import OptionItems from "@/components/options/options-items/OptionItems";
import CollapseOption from "@/components/options/collapse-options/Collapse";
import ProductList from "@/layouts/public/products/ProductsList";
import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import {
    FindAllProduct,
    FindProductBySlugCate,
} from "@/apis/product-management/products.apis";
import { IProduct } from "@/interfaces/models/products.interface";
import ProductLayout from "@/layouts/public/products/ProductsList";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import { findAllProductCate } from "@/apis/product-management/product-categories.apis";
export default async function ProductPage({
    searchParams,
    params,
}: IPageProps) {
    if (!searchParams?.limit) searchParams.limit = 10;
    if (!searchParams?.page) searchParams.page = 1;
    if (!searchParams?.isDeleted) searchParams.isDeleted = false;
    if (!searchParams?.fields) {
        searchParams.fields = [
            "prod_name",
            "prod_thumb",
            "prod_company",
            "prod_sku",
            "prod_price",
            "discount",
            "prod_price_official",
        ] as Array<keyof IProduct>;
    }

    // Tạo bản sao của searchParams nhưng chỉ thay đổi fields
    const searchProductCate = {
        ...searchParams,
        fields: ["pc_name", "pc_slug"] as Array<keyof IProductCategory>,
    };

    // if (params.slug) {
    //     if (params?.slug?.length > 1) {
    //         const products = await FindProductBySlugCate(params?.slug[params?.slug?.length - 1]);
    //         console.log("Trên::", products);
    //     } else {
    //         const products = await FindProductBySlugCate(params?.slug[0]);
    //         console.log("Dưới::", products);

    //     }
    // }

    const products = await FindAllProduct(searchParams);
    const productCategories = await findAllProductCate(searchProductCate);
    // const products = {} as any;
    return <ProductLayout products={products} categories={productCategories} />;
}
