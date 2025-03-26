"use client";

import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";

interface IProps {
  onChange: (value: number) => void; // `onChange` bắt buộc phải truyền
}

const QuantityContainer = styled.div`
  width: 100%;
  .box-quantity {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    align-items: center;
    height: 5rem;
    width: 100%;
    border-radius: 1.2rem;
    background-color: #f2f2f2;

    .quantity-control {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f2f2f2;
      cursor: pointer;
      border-radius: 1.2rem;
      button {
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .box-value {
      height: 100%;
      width: 100%;
      input {
        width: 100%;
        height: 100%;
        font-size: 1.6rem;
        border: none;
        outline: none;
        font-weight: 600;
        text-align: center;
        background-color: #f2f2f2;

        &:focus {
          background-color: white;
          border-radius: 1.4rem;
        }
      }
    }
  }
`;

export default function InputQuantity({ onChange }: IProps) {
  const [value, setValue] = useState<number>(1);

  const updateValue = (newValue: number) => {
    setValue(newValue);
    onChange(newValue); // Gọi `onChange` khi giá trị thay đổi
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      updateValue(newValue === "" ? 1 : parseInt(newValue, 10));
    }
  };

  return (
    <QuantityContainer>
      <div className="box-quantity">
        <div className="quantity-control" onClick={() => value > 1 && updateValue(value - 1)}>
          <button>
            <FaMinus size={16} />
          </button>
        </div>
        <div className="box-value">
          <input type="text" value={value} onChange={handleChange} />
        </div>
        <div className="quantity-control" onClick={() => updateValue(value + 1)}>
          <button>
            <FaPlus size={16} />
          </button>
        </div>
      </div>
    </QuantityContainer>
  );
}
