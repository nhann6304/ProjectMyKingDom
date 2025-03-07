"use client";
import "./style.scss";

// Icon
import {
    FindAllProduct,
    FindProductBySlugCate,
} from "@/apis/product-management/products.apis";
import categoryIcon from "@/assets/common/icon-public/svg/icon/cateIcon.svg";
import listIcon from "@/assets/common/icon-public/svg/icon/listIcon.svg";
import CardProduct from "@/components/cards/CardProduct";
import CollapseOption from "@/components/options/collapse-options/Collapse";
import { FaChevronDown } from "react-icons/fa";
//
import { Dropdown, MenuProps, Space, Tooltip } from "antd";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState, useTransition } from "react";
import { IProduct } from "@/interfaces/models/products.interface";
import Loading from "@/components/loading/Loading";
import OptionItems from "@/components/options/options-items/OptionItems";
import { findAllProductCate } from "@/apis/product-management/product-categories.apis";
interface IProps {
    products: Awaited<ReturnType<typeof FindAllProduct>>;
    categories: Awaited<ReturnType<typeof findAllProductCate>>
    keySearch: string[];
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

export default function ProductLayout({ products, categories, keySearch }: IProps) {
    const [seeGird, setSeeGird] = useState<boolean>(true);
    const [isLoading, startTransition] = useTransition();
    const pathname = usePathname();
    const [slug, setSlug] = useState<string[]>([]);
    const [listProducts, setListProducts] = useState<IProduct[]>(
        products?.metadata?.items || []
    );
    console.log("Con cac", keySearch);
    const searchParams = useSearchParams();
    const ageGroup = searchParams.get("ageGroup");
    // let listProducts: IProduct[] = [];
    useEffect(() => {
        startTransition(async () => {
            setSlug(pathname?.split("/").slice(2));
        });
    }, [pathname]);

    //Gọi api khi slug thay đổi
    useEffect(() => {
        console.log("slug", slug);
        startTransition(async () => {
            if (slug[0] === "all") {
                setListProducts(products?.metadata?.items || []);
            } else if (slug.length >= 2) {
                const result = await FindProductBySlugCate(slug[1]);
                setListProducts(result?.metadata?.items || []);
            } else {
                const result = await FindProductBySlugCate(slug[0]);
                setListProducts(result?.metadata?.items || []);
            }
        });
    }, [slug]);

    return (
        <div className="product-container container-pub">
            <div className="wrapper-container">
                <div className="box-control">
                    <CollapseOption categories={categories?.metadata?.items || []} />
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
                                <span className="">{listProducts.length} Sản phẩm</span>
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
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {listProducts?.map((prod) => (
                                            <Fragment key={prod.id}>
                                                <CardProduct product={prod} />
                                            </Fragment>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
