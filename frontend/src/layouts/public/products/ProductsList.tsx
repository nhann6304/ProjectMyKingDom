"use client";
import "./style.scss";

import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import DropdownNav from "@/components/dropdown/DropdownNav";

// Icon
import { CgMenuGridO } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import categoryIcon from "@/assets/common/icon-public/svg/icon/cateIcon.svg";
import listIcon from "@/assets/common/icon-public/svg/icon/listIcon.svg";
import Image from "next/image";
import CardProduct from "@/components/cards/CardProduct";
import { Fragment, useState } from "react";
import { FindAllProduct } from "@/apis/product-management/products.apis";

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

export default function ProductList({ products }: IProps) {
    const [seeGird, setSeeGird] = useState<boolean>(true);
    const listProduct = products?.metadata?.items;

    return (
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
                    {listProduct?.map((prod) => (
                        <Fragment key={prod.id} >
                            <CardProduct product={prod} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
