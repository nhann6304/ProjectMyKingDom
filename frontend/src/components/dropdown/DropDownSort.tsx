"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { CONST_SORT_VALUES } from "@/constants/values.constant";
import { ESortOptions } from "@/enums/ESort.enum";
import styled from "styled-components";

const SortContainer = styled.div`
  .dropdown-container {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .text-view-sort {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    gap: 1rem;

    .key-sort {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
    }
  }
`;

const BoxValueSortContainer = styled.span`
    font-weight: 600;
`

export default function DropDownSort() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentSortKey =
        (searchParams.get("sort") as ESortOptions) || ESortOptions.DEFAULT;
    const currentSortLabel = CONST_SORT_VALUES[currentSortKey] || "Mặc định";

    // Xử lý khi chọn item
    const handleClickSort: MenuProps["onClick"] = (e) => {
        const selectedKey = e.key as ESortOptions;
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", selectedKey); // Bắn key lên URL

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const DISABLED_SORT_KEYS = [ESortOptions.BEST_SELLING]; // Thêm các key cần disable
    //  Đặt items bên trong component để có quyền truy cập `currentSortKey`
    const items: MenuProps["items"] = Object.entries(CONST_SORT_VALUES).map(
        ([key, label]) => ({
            key,
            label: (
                <BoxValueSortContainer
                    style={{
                        color: currentSortKey === key ? "red" : "inherit",
                        textDecoration: currentSortKey === key ? "underline" : "none"
                    }}
                >
                    {label}
                </BoxValueSortContainer>
            ),
            disabled: DISABLED_SORT_KEYS.includes(key as ESortOptions),
        })
    );

    return (
        <SortContainer>
            <Dropdown
                trigger={["click"]}
                className="custom-dropdown"
                menu={{
                    items,
                    onClick: handleClickSort,
                    selectedKeys: [currentSortKey],
                }}
            >
                <span
                    className="dropdown-container"
                    onClick={(e) => e.preventDefault()}
                >
                    <span className="text-view-sort">
                        <span className="title-sort"> Sắp xếp theo:</span>{" "}
                        <span className="key-sort">
                            {currentSortLabel} <FaChevronDown />
                        </span>
                    </span>
                </span>
            </Dropdown>
        </SortContainer>
    );
}
