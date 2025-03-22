"use client";
import { useState } from "react";
import styled from "styled-components";

interface IProps {
    defaultValue: number;
    onChange: (value: number) => void;
}

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CircleButton = styled.button<{ color?: string }>`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.color || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: ${(props) => props.color || "#ccc"};
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.color || "#ccc"};
    color: white;
  }
`;

const QuantityInput = styled.input`
  width: 7rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 2px solid #aaa;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
`;

export default function InputQuantityCircle({
    defaultValue,
    onChange,
}: IProps) {
    const [value, setValue] = useState<number>(defaultValue);

    const updateValue = (newValue: number) => {
        if (newValue < 1) return;
        setValue(newValue);
        onChange(newValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            updateValue(newValue === "" ? 1 : parseInt(newValue, 10));
        }
    };

    return (
        <QuantityWrapper>
            <CircleButton color="#e57373" onClick={() => updateValue(value - 1)}>
                -
            </CircleButton>
            <QuantityInput type="text" value={value} onChange={handleChange} />
            <CircleButton color="#d32f2f" onClick={() => updateValue(value + 1)}>
                +
            </CircleButton>
        </QuantityWrapper>
    );
}
