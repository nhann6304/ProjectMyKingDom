"use client";

import { Checkbox, Collapse, CollapseProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useCollapseStore } from "@/stores/collapse/collapse.store";
import { IProductCategory } from "@/interfaces/models/product-categories.interface";

interface ICategory extends IProductCategory {
  children?: IProductCategory[]
}

interface IProps {
  categories: ICategory[]
}

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
          background: transparent;
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

export default function CollapseOption({ categories }: IProps) {
  const pathname = usePathname();
  const { collapseIndex, setCollapseIndex } = useCollapseStore();
  const [checkedValue, setCheckedValue] = useState<{ category: string; slug: string } | null>(null);

  useEffect(() => {
    const pathParts = pathname.split("/").slice(2);
    if (pathParts.length === 2) {
      setCheckedValue({ category: pathParts[0], slug: pathParts[1] });
    } else {
      setCheckedValue(null);
    }
  }, [pathname]);

  const handleCheckboxChange = (event: React.MouseEvent, category: string, slug: string) => {
    event.stopPropagation();

    if (checkedValue?.category === category && checkedValue?.slug === slug) {
      setCheckedValue(null);
      window.history.replaceState(null, "", "/products/all");
    } else {
      setCheckedValue({ category, slug });
      window.history.replaceState(null, "", `/products/${category}/${slug}`);
    }
  };

  const handleCollapseChange = (keys: string | string[]) => {
    setCollapseIndex(typeof keys === "string" ? [keys] : keys);
  };

  const items: CollapseProps["items"] = categories.map((cate, index) => ({
    key: index,
    label: cate?.pc_name,
    children: (
      <CheckBoxContainer>
        {cate?.children?.map((child, index) => (
          <Checkbox
            key={index}
            checked={checkedValue?.slug === child.pc_slug && checkedValue?.slug === child.pc_slug}
            onClick={(e) => handleCheckboxChange(e, cate.pc_slug, child.pc_slug)}
          >
            {child.pc_name}
          </Checkbox>
        ))}
      </CheckBoxContainer>
    ),
    extra: <span>({cate?.children?.length})</span>,
  }))

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