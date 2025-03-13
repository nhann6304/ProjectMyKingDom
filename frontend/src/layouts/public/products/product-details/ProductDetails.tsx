"use client";
import Image from "next/image";
import "./style.scss";
import hinh from "@/assets/common/icon-public/jpg/product.test.webp";
import { Checked, HearNotBg } from "@/assets/common/icon-public/svg/icon/iconItem";
import React, { useState } from "react";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import ButtonForm from "@/components/buttons/ButtonForm";
import InputQuantity from "@/components/inputs/input-quantity";
import ListInfoProduct from "@/components/lists/List-Info-Prod";
import { Settings } from "react-slick";
import CarouselHome from "@/components/carousels/CarouselHome";
import CardProduct from "@/components/cards/CardProduct";

interface ICommit {
    value: string;
    icon: React.ReactElement;
}
export default function ProductDetailsLayout() {
    const [value, setValue] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState("http://localhost:9000/uploads/minhvycafe.jpg");

    const handleSetValue = (e: number) => {
        console.log("què", e);
    };

    const settingsProduct: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    };

    const arrCommit: ICommit[] = [
        { value: "Hàng chính hãng", icon: <Checked /> },
        { value: "Miễn phí giao hàng toàn quốc đơn trên 500k", icon: <Checked /> },
        { value: "Giao hàng hỏa tốc 4 tiếng", icon: <Checked /> },
    ];

    const imageList = [
        "http://localhost:9000/uploads/minhvydalat.jpg",
        "http://localhost:9000/uploads/minhvycafe.jpg",
        "http://localhost:9000/uploads/minhvycafe2.jpg",
        "http://localhost:9000/uploads/kyky.jpg",
    ];

    return (
        <div className="detail-container container-pub">
            <div className="box-detail">
                <div className="box-detail-left">
                    <div className="image-big">
                        <Image src={selectedImage} width={400} height={300} alt="" />
                    </div>

                    <div className="image-small">
                        <CarouselHome scroll className="custom-carousel" settings={settingsProduct}>
                            {imageList.map((img, index) => (
                                <div
                                    key={index}
                                    className={`card-item ${selectedImage === img ? "active" : "blurred"}`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <Image height={180} width={180} src={img} alt="product" />
                                </div>
                            ))}
                        </CarouselHome>
                    </div>
                </div>

                <div className="box-detail-right">
                    <div className="detail-prod">
                        <div className="box-prod-title">
                            <span className="name-prod">Đồ Chơi Lắp Ráp Siêu Xe Mô Tô Của Người Dơi LEGO TECHNIC 42155</span>
                            <span className="icon-favourite">
                                <HearNotBg />
                            </span>
                        </div>

                        <div className="box-prod-origin">
                            <div className="trademark">
                                <span className="trademark-title">Thương hiệu</span>
                                <h4 className="trademark-name">LEGO TECHNIC</h4>
                            </div>
                            <div className="sku">
                                <span className="sku-number">SKU 42155</span>
                            </div>
                        </div>

                        <div className="box-prod-price">
                            <div className="price-normal">
                                <span className="price-normal-title">Giá thành viên</span>
                                <span className="price-normal-value">1.799.000 Đ</span>
                            </div>

                            <div className="price-official">
                                <span className="price-normal-title">Giá bán</span>
                                <span className="price-normal-value">1.799.000 Đ</span>
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
                                <ButtonForm title="Thêm vào giỏ hàng" />
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
                <span className="name-prod">Đồ Chơi Lắp Ráp Siêu Xe Mô Tô Của Người Dơi LEGO TECHNIC 42155</span>
            </div>
        </div>
    );
}
