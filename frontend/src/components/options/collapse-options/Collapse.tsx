"use client";
import { Checkbox, CollapseProps } from "antd";
import { Suspense, useEffect, useState } from "react";
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

function CollapseOptionWithSearchParams() {
    const router = useRouter();
    const pathname = usePathname(); // Lấy đường dẫn hiện tại
    const [checkedValue, setCheckedValue] = useState<string | null>(null);

    // Lấy giá trị từ pathname khi component mount
    useEffect(() => {
        const pathSegments = pathname.split("/");
        const lastSegment = pathSegments[pathSegments.length - 1];

        // Kiểm tra xem có phải là 1 trong các option hợp lệ không
        if (["option1", "option2", "option3", "option4", "option5"].includes(lastSegment)) {
            setCheckedValue(lastSegment);
        } else {
            setCheckedValue(null);
        }
    }, [pathname]);

    const handleCheckboxChange = (value: string) => {
        const newPath = checkedValue === value ? "/products/lego" : `/products/lego/${value}`;

        setCheckedValue(checkedValue === value ? null : value);
        router.push(newPath, { scroll: false });
    };

    const CheckBoxProduct = (
        <>
            {["option1", "option2", "option3", "option4", "option5"].map((option) => (
                <CheckBoxContainer key={option}>
                    <Checkbox
                        checked={checkedValue === option}
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
            extra: <span>(200)</span>,
        },
        {
            key: "2",
            label: "This is panel header 2",
            children: CheckBoxProduct,
            extra: <span>(200)</span>,
        },
    ];

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
