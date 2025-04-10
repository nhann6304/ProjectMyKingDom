"use client";
import { FindAllProduct } from "@/apis/product-management/products.apis";
import {
    Checked,
    HearNotBg,
} from "@/assets/common/icon-public/svg/icon/iconItem";
import ButtonForm from "@/components/buttons/ButtonForm";
import CarouselHome from "@/components/carousels/CarouselHome";
import InputQuantity from "@/components/inputs/input-quantity";
import ListInfoProduct from "@/components/lists/List-Info-Prod";
import { ICartItemChange } from "@/interfaces/common/ICart.interface";
import { useCartStore } from "@/stores/carts/carts.store";
import { convertPriceToString } from "@/utils";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { Settings } from "react-slick";
import "./style.scss";
import toast from "react-hot-toast";

interface IProps {
    product: Awaited<ReturnType<typeof FindAllProduct>>;
}

interface ICommit {
    value: string;
    icon: React.ReactElement;
}
export default function ProductDetailsLayout({ product }: IProps) {
    const productItem = product?.metadata?.items[0];
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState(productItem?.prod_thumb);
    const [isPending, startTransition] = useTransition();
    const { addProductToCart } = useCartStore();
    const handleSetValue = (e: number) => {
        setQuantity(e)
    };
    //
    const settingsProduct: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(productItem?.prod_thumbnails?.length ?? 4, 4),
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };
    //
    const arrCommit: ICommit[] = [
        { value: "Hàng chính hãng", icon: <Checked /> },
        { value: "Miễn phí giao hàng toàn quốc đơn trên 500k", icon: <Checked /> },
        { value: "Giao hàng hỏa tốc 4 tiếng", icon: <Checked /> },
    ];
    //
    const handleAddProductToCart = () => {
        const payload: ICartItemChange = {
            product_id: productItem?.id!,
            quantity: quantity
        }

        console.log(payload);

        startTransition(async () => {
            const result = await addProductToCart(payload);
            toast.success(result?.message)
        })

    }
    return (
        <div className="detail-container container-pub">
            <div className="box-detail">
                <div className="box-detail-left">
                    <div className="image-big">
                        <Image src={selectedImage || ""} width={400} height={300} alt="" />
                    </div>

                    <div className="image-small">
                        <CarouselHome
                            scroll
                            className="custom-carousel"
                            settings={settingsProduct}
                        >
                            {productItem?.prod_thumbnails?.map((img, index) => (
                                <div
                                    key={index}
                                    className={`card-item ${selectedImage === img.img_url ? "active" : "blurred"
                                        }`}
                                    onClick={() => setSelectedImage(img.img_url)}
                                >
                                    <Image
                                        height={180}
                                        width={180}
                                        src={img.img_url}
                                        alt="product"
                                    />
                                </div>
                            ))}
                        </CarouselHome>
                    </div>
                </div>

                <div className="box-detail-right">
                    <div className="detail-prod">
                        <div className="box-prod-title">
                            <span className="name-prod">{productItem?.prod_name}</span>
                            <span className="icon-favourite">
                                <HearNotBg />
                            </span>
                        </div>

                        <div className="box-prod-origin">
                            <div className="trademark">
                                <span className="trademark-title">Thương hiệu</span>
                                <h4 className="trademark-name">{productItem?.prod_company?.company_name}</h4>
                            </div>
                            <div className="sku">
                                {/* <span className="sku-number">SKU 42155</span> */}
                                <span className="sku-number">SKU: {productItem?.prod_sku}</span>
                            </div>
                        </div>

                        <div className="box-prod-price">
                            <div className="price-normal-container">
                                <div className="price-normal-left">
                                    <span className="price-normal-title">Giá thành viên</span>
                                    <div className="group-price">
                                        <span className="price-normal-value">
                                            Đang cập nhật giá thành viên{" "}
                                        </span>
                                        {/* <s className="price-old">1.299.000 Đ</s> */}
                                    </div>
                                </div>

                                <div className="price-normal-right">
                                    <span className="price-sale">-00%</span>
                                </div>
                            </div>

                            <div className="price-normal-container">
                                <div className="price-normal-left">
                                    <span className="price-normal-title">Giá bán</span>
                                    <div className="group-price">
                                        <span className="price-normal-value">
                                            {convertPriceToString(
                                                String(productItem?.prod_price_official)
                                            )}
                                        </span>
                                        <s className="price-old">
                                            {convertPriceToString(String(productItem?.prod_price))}
                                        </s>
                                    </div>
                                </div>

                                <div className="price-normal-right">
                                    <span className="price-sale">-20%</span>
                                </div>
                            </div>
                        </div>

                        <div className="box-prod-policy">
                            {arrCommit.map((item, index) => (
                                <div key={index} className="policy-items">
                                    <span className="item-icon">{item.icon}</span>
                                    <span className="item-content">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="box-prod-control">
                            <h1>Số lượng</h1>
                            <div className="btn-control">
                                <InputQuantity onChange={(value) => handleSetValue(value)} />
                                <span onClick={handleAddProductToCart}>
                                    <ButtonForm loading={isPending} title="Thêm vào giỏ hàng" />
                                </span>
                            </div>
                        </div>

                        <div className="box-prod-more">
                            <ListInfoProduct />
                        </div>
                    </div>
                </div>
            </div>
            <div className="description-prod">
                <h1 className="title">Mô tả sản phẩm</h1>
                <span className="name-prod">
                    Đồ Chơi Lắp Ráp Siêu Xe Mô Tô Của Người Dơi LEGO TECHNIC 42155
                </span>
            </div>
        </div>
    );
}
