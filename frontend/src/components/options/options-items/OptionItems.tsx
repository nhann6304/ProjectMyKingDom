"use client";

import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CONST_AGE_GROUP,
    CONST_GENDER_VALUES,
    CONST_PRICE_VALUES,
} from "@/constants/values.constant";

interface IProps {
    title: string;
    filterKey: string;
}

const OptionItemsContainer = styled.div`
  margin-top: 1.4rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-gray-200);

  .collapse-title {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    text-transform: capitalize;
    cursor: pointer;
    color: var(--color-background-global);
  }

  .box-option {
    max-height: 25rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default function OptionItems({ title, filterKey }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(true); //Đóng mở
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    // Ánh xạ `filterKey` thành dữ liệu tương ứng
    const getFilterValues = (type: string) => {
        const mapping: Record<string, Record<string | number, string | number>> = {
            prod_agePlay: CONST_AGE_GROUP,
            prod_price: CONST_PRICE_VALUES,
            prod_gender: CONST_GENDER_VALUES,
        };

        return Object.entries(mapping[type] || {}).map(([key, value]) => ({
            key,
            value,
        }));
    };

    useEffect(() => {
        const selectedKeys = searchParams.get(filterKey)?.split(",") || [];
        setCheckedValues(selectedKeys);
    }, [searchParams, filterKey]);

    const handleCheckboxChange = (key: string) => (e: any) => {
        const isChecked = e.target.checked;
        let newCheckedValues = isChecked
            ? [...checkedValues, key]
            : checkedValues.filter((item) => item !== key);

        setCheckedValues(newCheckedValues);

        const params = new URLSearchParams(searchParams);
        if (newCheckedValues.length > 0) {
            params.set(filterKey, newCheckedValues.join(","));
        } else {
            params.delete(filterKey);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Lấy dữ liệu theo filterKey
    const filterOptions = getFilterValues(filterKey);

    return (
        <OptionItemsContainer>
            <span className="collapse-title">{title}</span>
            {isOpen && (
                <div className="box-option">
                    {filterOptions.map(({ key, value }) => (
                        <Checkbox
                            key={key}
                            checked={checkedValues.includes(key)}
                            onChange={handleCheckboxChange(key)}
                        >
                            {value}
                        </Checkbox>
                    ))}
                </div>
            )}
        </OptionItemsContainer>
    );
}
