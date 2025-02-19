"use client";

import { Checkbox, CollapseProps } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Collapse, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

const CollapseContainer = styled.div`
  padding: 1.6rem 0;

  .collapse-title {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    text-transform: capitalize;
    cursor: pointer;
    color: var(--color-background-global);
  }

  .container-collapse {
    max-height: 30rem;
    overflow-y: scroll;
    overflow-x: hidden;
    .ant-collapse {
      background-color: transparent;
      border: none !important;

      .ant-collapse-item {
        .ant-collapse-header {
          padding: 1rem 0;
          padding-right: 1rem;

          &-text {
            font-weight: 600;
          }
        }

        .ant-collapse-content {
            padding: 5px 0;
          &-box {
            padding: 0;
          }
        }
      }
    }
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  padding: 5px 0;
`;

export default function CollapseOption() {
    const router = useRouter();
    const searchParams = useSearchParams();


    // Lấy danh sách checkbox từ URL
    const getCheckedFromURL = () => {
        const checkedValues = searchParams.get("checked");
        return checkedValues ? checkedValues.split(",") : [];
    };

    const [checkedList, setCheckedList] = useState<string[]>(getCheckedFromURL());

    // Cập nhật URL khi checkbox thay đổi
    const handleCheckboxChange = (value: string) => {
        let newCheckedList = [...checkedList];

        if (newCheckedList.includes(value)) {
            newCheckedList = newCheckedList.filter((item) => item !== value);
        } else {
            newCheckedList.push(value);
        }

        setCheckedList(newCheckedList);

        // Cập nhật URL
        const params = new URLSearchParams(searchParams);
        if (newCheckedList.length > 0) {
            params.set("checked", newCheckedList.join(","));
        } else {
            params.delete("checked");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const CheckBoxProduct = (
        <>
            {["option1", "option2", "option3", "option4", "option5"].map((option) => (
                <CheckBoxContainer>
                    <Checkbox
                        key={option}
                        checked={checkedList.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    >
                        {option}
                    </Checkbox>
                </CheckBoxContainer>
            ))}
        </>
    );

    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "This is panel header 1",
            children: CheckBoxProduct,
            extra: <span>(200)</span>
        },
        {
            key: "2",
            label: "This is panel header 2",

            children: CheckBoxProduct,
            extra: <span>(200)</span>
        },
    ];
    //


    return (
        <CollapseContainer>
            <span className="collapse-title">Danh mục</span>

            <div className="container-collapse">
                <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="end"
                    items={items}
                />
            </div>
        </CollapseContainer>
    );
}
