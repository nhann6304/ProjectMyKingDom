import Image from "next/image";
import "./style.scss";
import hinh from "@/assets/common/icon-public/jpg/product.test.webp";
import {
    Checked,
    HearNotBg,
} from "@/assets/common/icon-public/svg/icon/iconItem";
import React from "react";

interface ICommit {
    value: string;
    icon: React.ReactElement;
}
export default function ProductDetailsLayout() {
    const arrCommit: ICommit[] = [
        {
            value: "Hàng chính hãng",
            icon: <Checked />,
        },
        {
            value: "Miễn phí giao hàng toàn quốc đơn trên 500k",
            icon: <Checked />,
        },
        {
            value: "Giao hàng hỏa tốc 4 tiếng",
            icon: <Checked />,
        },
    ];

    return (
        <div className="detail-container container-pub">
            <div className="box-detail">
                <div className="box-detail-left">
                    <div className="image-big">
                        <Image src={hinh} alt="" />
                    </div>
                </div>
                <div className="box-detail-right">
                    <div className="detail-prod">
                        <div className="box-prod-title">
                            <span className="name-prod">
                                Đồ Chơi Lắp Ráp Siêu Xe Mô Tô Của Người Dơi LEGO TECHNIC 42155
                            </span>
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
                                    <span className="item-icon">
                                        {item.icon}
                                    </span>

                                    <span className="item-content">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
