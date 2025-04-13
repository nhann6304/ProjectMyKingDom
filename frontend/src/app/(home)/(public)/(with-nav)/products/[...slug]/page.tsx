import { findAllProductCate } from "@/apis/modules/product-management/product-categories.apis";
import {
    FindAllProduct
} from "@/apis/modules/product-management/products.apis";
import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import { IProductCategory } from "@/interfaces/models/IProduct-categories.interface";
import { IProduct } from "@/interfaces/models/IProducts.interface";
import ProductLayout from "@/layouts/public/products/products-lists/ProductsList";
export default async function ProductPage({
    searchParams,
    params,
}: IPageProps) {

    const keySearch = Object.keys(searchParams);
    // Tạo object mới mà không chứa các key trong keySearch
    const prodSearch = Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => !keySearch.includes(key))
    );

    if (!prodSearch?.limit) prodSearch.limit = 10;
    if (!prodSearch?.page) prodSearch.page = 1;
    if (!prodSearch?.isDeleted) prodSearch.isDeleted = false;
    if (!prodSearch?.fields) {
        prodSearch.fields = [
            "prod_name",
            "prod_thumb",
            "prod_company",
            "prod_sku",
            "prod_price",
            "discount",
            "prod_slug",
            "prod_price_official",
        ] as Array<keyof IProduct>;
    }

    // Tạo bản sao của prodSearch nhưng chỉ thay đổi fields
    const searchProductCate = {
        ...prodSearch,
        fields: ["pc_name", "pc_slug"] as Array<keyof IProductCategory>,
    };

    const products = await FindAllProduct(prodSearch);
    const productCategories = await findAllProductCate(searchProductCate);

    return (
        <ProductLayout keySearch={keySearch} products={products} categories={productCategories} />
    );
}
