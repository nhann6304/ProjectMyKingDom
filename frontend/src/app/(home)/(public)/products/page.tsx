import "./style.scss";
import OptionItems from "@/components/options/options-items/OptionItems";
import CollapseOption from "@/components/options/collapse-options/Collapse";
import ProductList from "@/layouts/public/products/ProductsList";
import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import { FindAllProduct } from "@/apis/product-management/products.apis";
import { IProduct } from "@/interfaces/models/products.interface";
// GetProduct
export default async function ProductPage({ searchParams }: IPageProps) {
    if (searchParams && !searchParams?.limit) searchParams.limit = 10;
    if (searchParams && !searchParams?.page) searchParams.page = 1;
    if (searchParams && !searchParams?.isDeleted) searchParams.isDeleted = false;
    if (searchParams && !searchParams?.fields) {
        searchParams.fields = ["prod_name", "prod_thumb"] as Array<keyof IProduct>;
    }

    const products = await FindAllProduct(searchParams);

    return (
        <div className="product-container container-pub">
            <div className="wrapper-container">
                <div className="box-control">
                    <CollapseOption />
                    <OptionItems />
                </div>

                <div className="box-product">
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    );
}
