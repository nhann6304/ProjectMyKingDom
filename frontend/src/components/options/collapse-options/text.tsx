"use client";
import { Checkbox, CollapseProps } from "antd";
import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Collapse } from "antd";
import { useRouter, usePathname } from "next/navigation";

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

const options = ["option1", "option2", "option3", "option4", "option5"];

function CollapseOptionWithSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const [checkedValue, setCheckedValue] = useState<string | null>(null);

    useEffect(() => {
        const lastSegment = pathname.split("/").pop() || "";
        if (options.includes(lastSegment)) {
            setCheckedValue((prev) => (prev !== lastSegment ? lastSegment : prev));
        } else {
            setCheckedValue(null);
        }
    }, [pathname]);

    const handleCheckboxChange = useCallback((value: string) => {
        if (checkedValue === value) return;

        const newPath = checkedValue === value ? "/products/lego" : `/products/lego/${value}`;
        setCheckedValue(checkedValue === value ? null : value);
        router.push(newPath, { scroll: false });
    }, [checkedValue, router]);

    const renderCheckBoxProduct = useMemo(() => (
        options.map((option) => (
            <CheckBoxContainer key={option}>
                <Checkbox
                    checked={checkedValue === option}
                    onChange={() => handleCheckboxChange(option)}
                >
                    {option}
                </Checkbox>
            </CheckBoxContainer>
        ))
    ), [checkedValue, handleCheckboxChange]);

    const items: CollapseProps["items"] = useMemo(() => [
        {
            key: "1",
            label: "This is panel header 1",
            children: renderCheckBoxProduct,
            extra: <span>(200)</span>,
        },
        {
            key: "2",
            label: "This is panel header 2",
            children: renderCheckBoxProduct,
            extra: <span>(200)</span>,
        },
    ], [renderCheckBoxProduct]);

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

export default function CollapseOption() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <CollapseOptionWithSearchParams />
        </Suspense>
    );
}
