"use client";
import { useState } from "react";
import styled from "styled-components";

interface IProps {
    defaultValue: number;
    onChange: (value: number) => void;
    inputWidth?: string;
    focusBgColor?: string;
}

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 425px) {
    gap: 0.5rem;
  }
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
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.color || "#ccc"};
    color: white;
  }

  @media (max-width: 425px) {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    width: 2.8rem;
    height: 2.8rem;
    font-size: 1.2rem;
  }
`;

const QuantityInput = styled.input.withConfig({
    shouldForwardProp: (prop) => !["focusBgColor", "inputWidth"].includes(prop),
}) <{ inputWidth?: string; focusBgColor?: string }>`
  width: ${(props) => props.inputWidth || "7rem"};
  height: 4rem;
  border-radius: 1.2rem;
  border: 2px solid #aaa;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  background-color: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: ${(props) => props.focusBgColor || "transparent"};
  }

  @media (max-width: 425px) {
    width: 6rem;
    height: 3.5rem;
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    width: 5rem;
    height: 3rem;
    font-size: 1.2rem;
  }
`;

export default function InputQuantityCircle({
    defaultValue,
    onChange,
    inputWidth = "7rem",
    focusBgColor = "#f0f0f0",
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
            <QuantityInput
                type="text"
                value={value}
                onChange={handleChange}
                inputWidth={inputWidth}
                focusBgColor={focusBgColor}
            />
            <CircleButton color="#d32f2f" onClick={() => updateValue(value + 1)}>
                +
            </CircleButton>
        </QuantityWrapper>
    );
}
