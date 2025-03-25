"use client";
import Image from "next/image";
import "./style.scss";
import logo from "@/assets/common/logo/logo-254x76.png";
import { Breadcrumb, Checkbox } from "antd";
import CardProductItem from "@/components/cards/CardProductItem";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import Link from "next/link";
import { useCartStore } from "@/stores/carts/carts.store";
import { useEffect, useState } from "react";
import { useUserCurrent } from "@/stores/userCurrent/userCurrent";
import { convertPriceToString } from "@/utils";
import toast from "react-hot-toast";
export default function CartLayout() {
    const [clause, setClause] = useState<boolean>(false);
    const { userCurrent } = useUserCurrent();
    const {
        cartProduct,
        fetchCartProduct,
        deleteCart: DeleteCartZustand,
        updateCart: UpdateCartZustand,
    } = useCartStore();
    //
    useEffect(() => {
        fetchCartProduct();
    }, [userCurrent, fetchCartProduct]);
    //
    const handleQuantityChange = (productId: string, newQuantity: number) => {
        UpdateCartZustand({ product_id: productId, quantity: newQuantity });
    };
    //
    const handleDeleteProduct = (idProduct: string) => {
        DeleteCartZustand(idProduct);
    };
    //Kiểm tra điều khoản
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClause(e.target.checked);
        console.log("clause::", clause);
    };

    console.log("cartProduct::", cartProduct);
    return (
        <div className="cart-container">
            <section className="section-container">
                <div className="box-left">
                    <div className="left-container">
                        <div className="cart-logo">
                            <Image src={logo} alt="logo" />
                        </div>

                        <div className="cart-breadcrumb">
                            <Breadcrumb
                                separator=">"
                                items={[
                                    {
                                        title: "Home",
                                    },
                                    {
                                        title: "Application Center",
                                        href: "",
                                    },
                                    {
                                        title: "Application List",
                                        href: "",
                                    },
                                    {
                                        title: "An Application",
                                    },
                                ]}
                            />
                        </div>

                        <div className="cart-noti-ship">
                            <span>Bạn được miễn phí ship</span>
                        </div>

                        <div className="cart-list-product">
                            {cartProduct?.cart_products?.map((val) => (
                                <div className="cart-list-product-item">
                                    <CardProductItem
                                        product={val?.product_detail}
                                        quantity={val?.quantity}
                                        onQuantityChange={(newQuantity) =>
                                            handleQuantityChange(val.product_detail.id, newQuantity)
                                        }
                                        onDeleteProductCart={handleDeleteProduct}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="box-right">
                    <div className="container">
                        <div className="total-price">
                            <div className="box-price-prod">
                                <span className="title">Tiền hàng hóa</span>
                                <span className="value">928.000 Đ</span>
                            </div>

                            <div className="box-price-prod discount">
                                <span className="title">Giảm giá</span>
                                <span className="value">0</span>
                            </div>

                            <div className="box-price-prod">
                                <span className="title">Tổng cộng</span>
                                <span className="total-value">
                                    {convertPriceToString(String(cartProduct?.total_all_price))}
                                </span>
                            </div>
                        </div>

                        <div className="body">
                            <div className="box-control">
                                <ButtonCommon title="Thanh toán ngay" background />
                            </div>

                            <div className="check-box">
                                <input
                                    onChange={handleCheckBoxChange}
                                    type="checkbox"
                                    className="input-checkbox"
                                />
                                <span>
                                    Tôi đã đọc và đồng ý với điều khoản và điều kiện thanh toán
                                </span>
                            </div>

                            <div className="instruct">
                                <span className="instruct-text">
                                    <Link className="instruct-link" href={"#"}>
                                        Đăng nhập
                                    </Link>
                                    Hoặc
                                    <Link className="instruct-link" href={"#"}>
                                        Đăng ký
                                    </Link>
                                    để mua hàng với nhiều ưu đãi hơn
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
