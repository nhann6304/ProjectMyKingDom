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
import {
    Button,
    Drawer,
    Dropdown,
    MenuProps,
    Pagination,
    PaginationProps,
    Space,
    Tooltip,
} from "antd";
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
import {
    ArrowRight,
    Cancel,
    SortIcon,
} from "@/assets/common/icon-public/svg/icon/iconItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DropDownSort from "@/components/dropdown/DropDownSort";
import { SORT_FIELD_MAP } from "@/constants/values.constant";
import { ESortOptions } from "@/enums/ESort.enum";
interface IProps {
    products: Awaited<ReturnType<typeof FindAllProduct>>;
    categories: Awaited<ReturnType<typeof findAllProductCate>>;
    keySearch: string[];
}

export default function ProductLayout({
    products,
    categories,
    keySearch,
}: IProps) {
    const [seeGird, setSeeGird] = useState<boolean>(true);
    const [listProducts, setListProducts] = useState<IProduct[]>(
        products?.metadata?.items || []
    );
    const [totalProduct, setTotalProduct] = useState<number>(
        products?.metadata?.totalItems as number
    );
    const [isLoading, startTransition] = useTransition();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [slug, setSlug] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [querySizePage, setQuerySizePage] = useState({
        limit: 12,
        page: 1,
    });
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
            const newSlug = pathname?.split("/").slice(2);
            const formattedData: {
                f: string;
                v: string | { min: number; max: number };
            }[] = [];

            let sortValue: string | null = searchParams.get("sort"); // Giá trị order (ví dụ: "PRICE_ASC")
            let sortField: string | undefined =
                SORT_FIELD_MAP[sortValue as ESortOptions]; // Field tương ứng

            // Nếu không có sortField, gán giá trị mặc định
            const sort: { field: string; order: string } | null =
                sortField && sortValue ? { field: sortField, order: sortValue } : null;

            // Xử lý keySearch & searchParams
            keySearch.forEach((key) => {
                const values = searchParams.get(key)?.split(",") || [];

                if (key !== "sort") {
                    values.forEach((value) => {
                        if (key === "prod_price_official" && value.includes("-")) {
                            const [min, max] = value.split("-").map(Number);
                            formattedData.push({ f: key, v: { min, max } });
                        } else {
                            formattedData.push({ f: key, v: value });
                        }
                    });
                }
            });

            // Gán vào queryParams
            queryParams.limit = querySizePage.limit;
            queryParams.page = querySizePage.page;
            queryParams.filter = JSON.stringify({ filter: formattedData });

            // Nếu có sort, gán vào queryParams, nếu không bỏ qua
            if (sort) {
                queryParams.sort = JSON.stringify({ sort });
            }
            console.log("queryParams:::::", queryParams);
            // Gọi API
            if (newSlug[0] === "all") {
                const result = await FindAllProduct(queryParams);
                setListProducts(result?.metadata?.items || []);
                setTotalProduct(result?.metadata?.totalItems ?? 0);
            } else if (newSlug.length >= 2) {
                const result = await FindProductBySlugCate(newSlug[1], queryParams);
                setTotalProduct(result?.metadata?.totalItems ?? 0);
                setListProducts(result?.metadata?.items || []);
            } else {
                const result = await FindProductBySlugCate(newSlug[0], queryParams);
                setTotalProduct(result?.metadata?.totalItems ?? 0);
                setListProducts(result?.metadata?.items || []);
            }
        });
    }, [pathname, searchParams, keySearch, querySizePage]);

    //
    const showDrawer = () => {
        setOpen(true);
    };
    //
    const onClose = () => {
        setOpen(false);
    };
    // Phân trang
    const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
        current,
        pageSize
    ) => {
        setQuerySizePage({ limit: pageSize, page: current });
    };
    //Sắp xếp
    const handleClickSort: MenuProps["onClick"] = (e) => { };

    return (
        <div className="product-container container-pub">
            <div className="wrapper-container ">
                <div className="box-control">
                    {keySearch.length !== 0 && !keySearch.includes("sort") && <ListFilterProd keySearch={keySearch} />}
                    <CollapseOption categories={categories?.metadata?.items || []} />
                    <OptionItems title={"Danh mục"} filterKey="prod_agePlay" />
                    <OptionItems title={"Giá (Đ)"} filterKey="prod_price_official" />
                    <OptionItems title={"Giới tính"} filterKey="prod_gender" />

                    <Drawer
                        rootClassName="custom-drawer"
                        title="Bộ lọc"
                        footer={
                            <div className="text-center py-5 text-white bg-gray-800 text-2xl ">
                                Kết quả (1)
                            </div>
                        }
                        placement={"left"}
                        onClose={onClose}
                        open={open}
                        styles={{
                            header: {
                                textAlign: "center",
                            },
                        }}
                    >
                        {keySearch.length !== 0 && <ListFilterProd keySearch={keySearch} />}
                        <CollapseOption categories={categories?.metadata?.items || []} />
                        <OptionItems title={"Danh mục"} filterKey="prod_agePlay" />
                        <OptionItems title={"Giá (Đ)"} filterKey="prod_price_official" />
                        <OptionItems title={"Giới tính"} filterKey="prod_gender" />
                    </Drawer>
                </div>

                <div className="box-product ">
                    <div className="product-container">
                        <header>
                            <div className="view-responsive" onClick={showDrawer}>
                                <span>Bộ lọc</span>
                                {open ? <Cancel /> : <SortIcon />}
                            </div>

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
                                <span>{listProducts.length} Sản phẩm</span>
                            </div>

                            <div className="view-right">
                                {/* Bộ lọc */}
                                <DropDownSort />
                            </div>
                        </header>
                        {/* Hiển thị sản phảm */}
                        <div className="product-body">
                            <div
                                className={`product-list-responsive ${seeGird ? "product-list-three-item" : "product-list-two-item"
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
                        {/*  */}
                        {totalProduct >= 10 && (
                            <div className="product-footer">
                                <Pagination
                                    showSizeChanger={false}
                                    onShowSizeChange={onShowSizeChange}
                                    current={querySizePage.page}
                                    // total={500}
                                    total={totalProduct}
                                    onChange={(page) => {
                                        setQuerySizePage((prev) => ({ ...prev, page }));
                                        if (typeof window !== "undefined") {
                                            window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Gọi đúng cách
                                        }
                                    }}
                                    prevIcon={<ArrowRight />}
                                    nextIcon={<ArrowRight />}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
