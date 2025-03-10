import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import ProductDetailsLayout from "@/layouts/public/products/product-details/ProductDetails";

export default function ProductDetails({ params, searchParams }: IPageProps) {
    // console.log("params::", params);
    return (
        <div>
            <ProductDetailsLayout />
        </div>
    )
}
