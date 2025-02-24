"use client";

import { CONST_AGE_GROUP } from "@/constants/values.constant";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

const OptionItemsContainer = styled.div`
  margin-top: 1.4rem;

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

export default function OptionItems() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const arrAgeGroup = Object.values(CONST_AGE_GROUP);

    // Lấy danh sách checkbox đã chọn từ URL
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    useEffect(() => {
        if (searchParams) {
            const checkedValuesFromUrl = searchParams.get("ageGroup");
            setCheckedValues(checkedValuesFromUrl ? checkedValuesFromUrl.split(",") : []);
        }
    }, [searchParams]);

    const handleCheckboxChange = (value: string) => (e: any) => {
        const isChecked = e.target.checked;
        let newCheckedValues = isChecked
            ? [...checkedValues, value]
            : checkedValues.filter((item) => item !== value);

        setCheckedValues(newCheckedValues);

        const params = new URLSearchParams(searchParams);
        if (newCheckedValues.length > 0) {
            params.set("ageGroup", newCheckedValues.join(","));
        } else {
            params.delete("ageGroup");
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <OptionItemsContainer>
            <span className="collapse-title">Danh mục</span>

            <div className="box-option">
                {arrAgeGroup.map((item) => (
                    <Checkbox
                        key={item}
                        checked={checkedValues.includes(item)}
                        onChange={handleCheckboxChange(item)}
                    >
                        {item}
                    </Checkbox>
                ))}
            </div>
        </OptionItemsContainer>
    );
}
