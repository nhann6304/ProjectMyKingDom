"use client";
import { Drawer, DrawerProps, Dropdown, MenuProps } from "antd";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import "./style.scss";
//
import { MdOutlineArrowDropDown } from "react-icons/md";

import { findAllProductCate } from "@/apis/product-management/product-categories.apis";
import anhquoc from "@/assets/common/icon-public/jpg/co-viet-nam.svg.png";
import logo from "@/assets/common/icon-public/jpg/logo-254x76 (1).png";
import {
    AccountIcon,
    CardIcon,
    TruckLive,
} from "@/assets/common/icon-public/svg/icon/iconItem";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import CartProductCard from "@/components/cards/CartProductCard";
import DropdownNav from "@/components/dropdown/DropdownNav";
import InputSearch from "@/components/inputs/input-search";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";
import { useUserCurrent } from "@/stores/userCurrent/userCurrent";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
import { FindAllCarts } from "@/apis/product-management/carts.apis";
import { IProduct } from "@/interfaces/models/products.interface";
import { ICart, ICartDetail } from "@/interfaces/models/carts.interface";
import { useCartStore } from "@/stores/carts/carts.store";
import { convertPriceToString } from "@/utils";

interface IProps {
    categories: Awaited<ReturnType<typeof findAllProductCate>>;
}

interface IOption {
    content: string;
    icon: React.ReactNode;
}

type ICustomProductCate = IProductCategory & { children: IProductCategory[] }; // Adđ thêm type vào

const ListOption: IOption[] = [
    {
        content: "Theo dõi đơn hàng",
        icon: <TruckLive />,
    },

    {
        content: "Theo dõi đơn hàng",
        icon: <AccountIcon />,
    },

    {
        content: "Giỏ hàng",
        icon: <CardIcon />,
    },
];

const items: MenuProps["items"] = [
    {
        key: "1",
        label: <div>hi</div>,
    },
];

const itemsProduct: MenuProps["items"] = [
    {
        key: "1",
        label: <div className="">product</div>,
    },
];

export default function BottomNav({ categories }: IProps) {
    const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
    const [open, setOpen] = useState<boolean>(false);
    // const [cartProduct, setCartProduct] = useState<ICart>();
    const { userCurrent } = useUserCurrent();
    const {
        cartProduct,
        fetchCartProduct,
        updateCart: UpdateCartZustand,
    } = useCartStore();
    const [isPending, startTransition] = useTransition();
    const product = categories?.metadata?.items as ICustomProductCate[];
    //
    useEffect(() => {
        fetchCartProduct();
    }, [fetchCartProduct]);

    //
    const showDrawer = () => {
        setOpen(true);
    };
    //
    const onClose = () => {
        setOpen(false);
    };
    //
    const dropdownData = [
        {
            category: "Đồ chơi theo phim",
            products: ["Siêu anh hùng", "Siêu Robot", "Siêu thú"],
        },
    ];
    //
    const handleQuantityChange = (productId: string, newQuantity: number) => {
        UpdateCartZustand({ product_id: productId, quantity: newQuantity });

    };
    //

    console.log(cartProduct?.total_all_price);

    return (
        <div className="nav-container">
            <div className="section-top container-pub">
                <div className="section-top-mobile">
                    {/* LOGO */}
                    <Link href={"/"} className="box-logo">
                        <Image src={logo} alt="logo" />
                    </Link>
                    {/* THANH SEARCH */}
                    <div className="box-search">
                        <InputSearch size="large" />
                    </div>
                </div>

                {/* CÁC OPTION */}
                <div className="box-option">
                    <div className="option-item">
                        <button>
                            <TruckLive />
                            <h2>Theo dõi đơn hàng</h2>
                        </button>
                    </div>

                    {userCurrent && (
                        <Link href={"/account"} className="option-item">
                            <button>
                                <AccountIcon />
                                <h2>Tài khoản</h2>
                            </button>
                        </Link>
                    )}

                    {!userCurrent && (
                        <Link href={"/auth/login"} className="option-item">
                            <button>
                                <AccountIcon />
                                <h2>Đăng nhập</h2>
                            </button>
                        </Link>
                    )}

                    <div className="option-item">
                        <button>
                            <CardIcon />
                            <h2>Giỏ hàng</h2>
                        </button>

                        {cartProduct ? (
                            <div className="info-box">
                                <div className="cart-list-box">
                                    {cartProduct?.cart_products?.map((item, index) => (
                                        <CartProductCard
                                            key={index}
                                            quantity={item.quantity}
                                            product={item.product_detail}
                                            onQuantityChange={(newQuantity) =>
                                                handleQuantityChange(
                                                    item.product_detail.id,
                                                    newQuantity
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                                <div className="list-box-footer">
                                    <div className="clause-question">
                                        <input className="input-checkbox" type="checkbox" />
                                        <span>
                                            Tôi đã đọc và đồng ý với{" "}
                                            <Link href={"#"}> điều khoản</Link> và{" "}
                                            <Link href={"#"}> điều kiện thanh toán</Link>
                                        </span>
                                    </div>

                                    <div className="box-total-price">
                                        <h1 className="title">Tổng cộng</h1>
                                        <span className="value">
                                            {convertPriceToString(
                                                String(cartProduct.total_all_price)
                                            )}
                                        </span>
                                    </div>

                                    <div className="box-control">
                                        <ButtonCommon
                                            title="Xem giỏ hàng"
                                            icon
                                            iconPosition="left"
                                            customIcon={<CardIcon />}
                                            hoverBg={false}
                                        />
                                        <ButtonCommon title="Thanh toán ngay" background />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="info-box">
                                <h1>Giỏ hàng của bạn đang trống</h1>
                                <ButtonCommon
                                    title="Tiếp tục mua sắm"
                                    hoverBg={true}
                                    background
                                />
                            </div>
                        )}
                    </div>

                    <div className="option-item">
                        <Dropdown menu={{ items }}>
                            <div className="nation-language">
                                <Image src={anhquoc} alt="language" />
                                <MdOutlineArrowDropDown />
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="section-bottom">
                <div className="option-container container-pub">
                    <div className="option-child">
                        <span>Hàng mới</span>
                    </div>

                    <div className="option-child">
                        <Link className="option-child-item" href={"/products/all"}>
                            Sản phẩm
                        </Link>
                        <FaChevronDown className="icon-default" size={13} />
                        <FaChevronUp className="icon-hover" size={13} />
                        <DropdownNav>
                            <div className="drop-container">
                                {product?.map((item, index) => (
                                    <div className="dropdown-item" key={index}>
                                        {/* Render mỗi item-content cho từng category */}
                                        <div className="item-content" key={index}>
                                            <Link
                                                href={`/products/${item?.pc_slug}`}
                                                className="content-title"
                                            >
                                                <span className="content-category">{item.pc_name}</span>
                                                <IoMdArrowDropright size={24} />
                                            </Link>

                                            <div className="content-value">
                                                {item?.children?.map((child, productIndex) => (
                                                    <Link
                                                        href={`/products/${item?.pc_slug}/${child?.pc_slug}`}
                                                        className="value-product"
                                                        key={productIndex}
                                                    >
                                                        {child.pc_name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DropdownNav>
                    </div>

                    <div className="option-child">
                        <span>Thương hiệu</span>
                    </div>

                    <div className="option-child">
                        <span>Độc quyền online</span>
                    </div>

                    <div className="option-child">
                        <span>Khuyến mãi</span>
                    </div>

                    <div className="option-child">
                        <span>Chương trình thành viên</span>
                    </div>

                    <div className="option-child">
                        <span>Cẩn nang</span>
                    </div>
                </div>

                <div className="drawer-box">
                    <IoMenu size={30} color="white" onClick={showDrawer} />
                </div>

                <div className="box-search-mobile">
                    <InputSearch size="large" />
                </div>
            </div>

            <Drawer
                title="Basic Drawer"
                placement={placement}
                closable={false}
                size="default"
                onClose={onClose}
                open={open}
                key={placement}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
}
