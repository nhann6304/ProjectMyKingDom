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
import ListFilterProd from "@/components/lists/ListFilterProd";
import { convertOjbToString } from "@/utils";
import { CONST_API_COMMON, CONST_APIS } from "@/constants/apis.constant";
interface IProps {
    products: Awaited<ReturnType<typeof FindAllProduct>>;
    categories: Awaited<ReturnType<typeof findAllProductCate>>;
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


export default function ProductLayout({
    products,
    categories,
    keySearch,
}: IProps) {
    const [seeGird, setSeeGird] = useState<boolean>(true);
    const [listProducts, setListProducts] = useState<IProduct[]>(
        products?.metadata?.items || []
    );
    const [isLoading, startTransition] = useTransition();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState<string[]>([]);
    const [valueFilter, setValueFilter] = useState<any>();
    //
    const queryParams: any = {};
    if (queryParams && !queryParams?.limit) queryParams.limit = 10;
    if (queryParams && !queryParams?.page) queryParams.page = 1;
    if (queryParams && !queryParams?.isDeleted) queryParams.isDeleted = false;
    if (!queryParams?.fields) {
        queryParams.fields = [
            "prod_name",
            "prod_thumb",
            "prod_company",
            "prod_sku",
            "prod_price",
            "discount",
            "prod_slug",
            "prod_price_official",
        ] as Array<keyof IProduct>;
    }
    //
    useEffect(() => {
        startTransition(async () => {
            // Cập nhật slug từ pathname
            const newSlug = pathname?.split("/").slice(2);
            setSlug(newSlug);

            const formattedData: { f: string; v: string | { min: number; max: number } }[] = [];
            // Xử lý keySearch & searchParams
            keySearch.forEach((key) => {
                const values = searchParams.get(key)?.split(",") || []; // Lấy danh sách giá trị, nếu có

                values.forEach((value) => {
                    if (key === "prod_price_official" && value.includes("-")) {
                        // Nếu key là prod_Price_office và value chứa dấu "-", tách thành min-max
                        const [min, max] = value.split("-").map(Number);
                        formattedData.push({ f: key, v: { min, max } });
                    } else {
                        // Nếu không, giữ nguyên
                        formattedData.push({ f: key, v: value });
                    }
                });
            });

            queryParams.filter = JSON.stringify({ filter: formattedData });

            if (newSlug[0] === "all") {
                const result = await FindAllProduct(queryParams);
                setListProducts(result?.metadata?.items || []);
            } else if (newSlug.length >= 2) {
                const result = await FindProductBySlugCate(newSlug[1], queryParams);
                setListProducts(result?.metadata?.items || []);
            } else {
                const result = await FindProductBySlugCate(newSlug[0], queryParams);
                setListProducts(result?.metadata?.items || []);
            }
        });
    }, [pathname, searchParams, keySearch]);

    //
    return (
        <div className="product-container container-pub">
            <div className="wrapper-container">
                <div className="box-control">
                    {keySearch.length !== 0 && <ListFilterProd keySearch={keySearch} />}
                    <CollapseOption categories={categories?.metadata?.items || []} />
                    <OptionItems title={"Danh mục"} filterKey="prod_agePlay" />
                    <OptionItems title={"Giá (Đ)"} filterKey="prod_price_official" />
                    <OptionItems title={"Giới tính"} filterKey="prod_gender" />
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
