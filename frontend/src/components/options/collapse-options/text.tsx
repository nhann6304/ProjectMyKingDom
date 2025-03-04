"use client";

import { Checkbox, Collapse, CollapseProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { useCollapseStore } from "@/stores/text";

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
    label: "Lego",
    extra: "(200)",
    checkboxOptions: ["lego-xe-co", "Option-2", "Option-3"],
  },
  {
    key: "2",
    label: "Category-2",
    extra: "(150)",
    checkboxOptions: ["Option-A", "Option-B", "Option-C"],
  },
  {
    key: "3",
    label: "Category-3",
    extra: "(300)",
    checkboxOptions: ["Item-X", "Item-Y", "Item-Z"],
  },
];

export default function CollapseOption() {
  const pathname = usePathname();
  const [checkedValue, setCheckedValue] = useState<{ category: string; value: string } | null>(null);
  const { collapseIndex, setCollapseIndex } = useCollapseStore();

  useEffect(() => {
    const pathParts = pathname.split("/").slice(2);
    if (pathParts.length === 2) {
      setCheckedValue({ category: pathParts[0], value: pathParts[1] });
    } else {
      setCheckedValue(null);
    }
  }, [pathname]);

  const handleCheckboxChange = (event: React.MouseEvent, category: string, value: string) => {
    event.stopPropagation();

    const currentScrollY = window.scrollY; // Lưu vị trí cuộn hiện tại

    if (checkedValue?.category === category && checkedValue?.value === value) {
      setCheckedValue(null);
      window.history.replaceState(null, "", "/products/all");
    } else {
      setCheckedValue({ category, value });
      window.history.replaceState(null, "", `/products/${category}/${value}`);
    }

    setTimeout(() => {
      window.scrollTo(0, currentScrollY); // Giữ vị trí cuộn ban đầu
    }, 0);
  };

  const handleCollapseChange = (keys: string | string[]) => {
    setCollapseIndex(typeof keys === "string" ? [keys] : keys);
  };

  const items: CollapseProps["items"] = collapseData.map(({ key, label, extra, checkboxOptions }) => ({
    key,
    label,
    children: (
      <CheckBoxContainer>
        {checkboxOptions.map((option) => (
          <Checkbox
            key={option}
            checked={checkedValue?.category === label && checkedValue?.value === option}
            onClick={(e) => handleCheckboxChange(e, label, option)}
          >
            {option}
          </Checkbox>
        ))}
      </CheckBoxContainer>
    ),
    extra: <span>{extra}</span>,
  }));

  return (
    <CollapseContainer>
      <span className="collapse-title">Danh mục</span>
      <div className="container-collapse">
        <Collapse
          activeKey={collapseIndex}
          onChange={handleCollapseChange}
          expandIconPosition="end"
          items={items}
        />
      </div>
    </CollapseContainer>
  );
}
