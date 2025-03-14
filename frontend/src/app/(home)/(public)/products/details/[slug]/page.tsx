import { FindAllProduct } from "@/apis/product-management/products.apis";
import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import { IProduct } from "@/interfaces/models/products.interface";
import ProductDetailsLayout from "@/layouts/public/products/product-details/ProductDetails";

export default async function ProductDetails({
    params,
    searchParams,
}: IPageProps) {
    if (searchParams && !searchParams?.limit) searchParams.limit = 10;
    if (searchParams && !searchParams?.page) searchParams.page = 1;
    if (searchParams && !searchParams?.isDeleted) searchParams.isDeleted = false;
    if (!searchParams?.fields) {
        searchParams.fields = [
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

    const filter: { f: string; v: string }[] = [
        {
            f: "prod_slug",
            v: params.slug || "",
        },
    ];

    searchParams.filter = JSON.stringify(filter);

    const product = await FindAllProduct(searchParams);

    return (
        <div>
            <ProductDetailsLayout product={product} />
        </div>
    );
}
