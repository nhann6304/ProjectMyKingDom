"use client";

import { Checkbox, Collapse, CollapseProps } from "antd";
import { useState } from "react";
import styled from "styled-components";

const CollapseContainer = styled.div`
  padding: 1.4rem 0;
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

  .container-collapse {
    max-height: 30rem;
    overflow-y: auto;

    .ant-collapse {
      background-color: transparent;
      border: none !important;

      .ant-collapse-item {
        .ant-collapse-header {
          padding: 1rem 0;
          padding-right: 1rem;
          font-weight: 600;
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
  flex-direction: column;
  gap: 8px;
  padding: 5px 0;
`;

const collapseData = [
    {
        key: "1",
        label: "Category 1",
        extra: "(200)",
        checkboxOptions: ["Option 1", "Option 2", "Option 3"],
    },
    {
        key: "2",
        label: "Category 2",
        extra: "(150)",
        checkboxOptions: ["Option A", "Option B", "Option C"],
    },
    {
        key: "3",
        label: "Category 3",
        extra: "(300)",
        checkboxOptions: ["Item X", "Item Y", "Item Z"],
    },
];

export default function CollapseOption() {
    const [checkedValue, setCheckedValue] = useState<string | null>(null);

    const handleCheckboxChange = (value: string) => {
        console.log(value);
        setCheckedValue((prevValue) => (prevValue === value ? null : value));
    };

    const items: CollapseProps["items"] = collapseData.map(
        ({ key, label, extra, checkboxOptions }) => ({
            key,
            label,
            children: (
                <CheckBoxContainer>
                    {checkboxOptions.map((option) => (
                        <Checkbox
                            key={option}
                            checked={checkedValue === option}
                            onChange={() => handleCheckboxChange(option)}
                        >
                            {option}
                        </Checkbox>
                    ))}
                </CheckBoxContainer>
            ),
            extra: <span>{extra}</span>,
        })
    );

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
