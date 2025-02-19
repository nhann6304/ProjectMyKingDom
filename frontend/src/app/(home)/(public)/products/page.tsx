import "./style.scss"
import CollapseOption from "@/components/options/collapse-options/Collapse";
export default function ProductPage() {
    return (
        <div className="product-container container-pub">
            <div className="wrapper-container">
                <div className="box-control">
                    <CollapseOption />
                </div>

                <div className="box-product">
                    Product
                </div>
            </div>
        </div>
    )
}
