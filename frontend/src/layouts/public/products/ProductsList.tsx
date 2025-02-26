"use client";
import "./style.scss";


// Icon
import { CgMenuGridO } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import categoryIcon from "@/assets/common/icon-public/svg/icon/cateIcon.svg";
import listIcon from "@/assets/common/icon-public/svg/icon/listIcon.svg";
import CardProduct from "@/components/cards/CardProduct";
import { FindAllProduct } from "@/apis/product-management/products.apis";
import CollapseOption from "@/components/options/collapse-options/Collapse";
import OptionItems from "@/components/options/options-items/OptionItems";
//
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import DropdownNav from "@/components/dropdown/DropdownNav";
import { useParams } from "next/navigation";


interface IProps {
    products: Awaited<ReturnType<typeof FindAllProduct>>;
}

const items: MenuProps["items"] = [
    {
        key: "1",
        label: "My Account",
        disabled: true,
    },
    {
        type: "divider",
    },
    {
        key: "2",
        label: "Profile",
        extra: "⌘P",
    },
    {
        key: "3",
        label: "Billing",
        extra: "⌘B",
    },
    {
        key: "4",
        label: "Settings",
        icon: <FaChevronDown />,
        extra: "⌘S",
    },
];

export default function ProductLayout({ products }: IProps) {
    const [seeGird, setSeeGird] = useState<boolean>(true);
    // const listProduct = products?.metadata?.items;

    const params = useParams();
    const slug = params?.slug;

    //Gọi api khi slug thay đổi
    useEffect(() => {
        console.log("Slug từ url", slug);
    }, [slug])

    return (
        <div className="product-container container-pub">
            <div className="wrapper-container">
                <div className="box-control">
                    <CollapseOption />
                    <OptionItems />
                </div>

                <div className="box-product">
                    <div className="product-container">
                        <header>
                            <div className="view-left">
                                <span className="text-view-setting">Kiểu xem</span>
                                <Tooltip arrow={false} title="Chế độ xem 2 lưới">
                                    <Image
                                        onClick={() => setSeeGird(false)}
                                        src={categoryIcon}
                                        alt="categoryIcon"
                                    />
                                </Tooltip>

                                <Tooltip arrow={false} title="Chế độ xem 3 lưới">
                                    <Image
                                        onClick={() => setSeeGird(true)}
                                        src={listIcon}
                                        alt="listIcon"
                                    />
                                </Tooltip>
                            </div>

                            <div className="view-center">
                                <span className="">896 Sản phẩm</span>
                            </div>

                            <div className="view-right">
                                <Dropdown className="custom-dropdown" menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <span className="text-view-sort">Sắp xếp theo:</span>
                                            <FaChevronDown />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </header>

                        <div className="product-body">
                            <div
                                className={`${seeGird ? "product-list-three-item" : "product-list-two-item"
                                    }`}
                            >
                                {/* {listProduct?.map((prod) => (
                                    <Fragment key={prod.id} >
                                        <CardProduct product={prod} />
                                    </Fragment>
                                ))} */}
                                <CardProduct />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
