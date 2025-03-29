"use client";
import search from "@/assets/common/icons/search.png";
import { ItemIcon } from "@/assets/common/icon-public/svg/icon/iconItem";
import Image from "next/image";
import styled from "styled-components";

interface InputSearchProps {
  size?: "small" | "medium" | "large";
}

const sizeStyles = {
  small: {
    inputHeight: "2rem",
    inputWidth: "10rem",
    imgSize: "1rem",
  },
  medium: {
    inputHeight: "3rem",
    inputWidth: "15rem",
    imgSize: "1.6rem",
  },
  large: {
    inputHeight: "4.8rem",
    inputWidth: "100%",
    imgSize: "2rem",
  },
};

const SearchContainer = styled.div<{
  $inputHeight: string;
  $inputWidth: string;
  $imgSize: string;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1.6rem;
  border-radius: 4rem;
  border: 1.5px solid var(--color-gray-300);
  gap: 1rem;
  background: white;

  input {
    height: ${(props) => props.$inputHeight};
    width: ${(props) => props.$inputWidth};
    padding: 0.5rem;
    font-size: 1.6rem;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: #9ca3af;
    }
  }

  img, svg {
    width: ${(props) => props.$imgSize};
    height: ${(props) => props.$imgSize};
  }

  /* Responsive */
  @media (max-width: 1024px) {
    input {
      height: calc(${(props) => props.$inputHeight} - 0.4rem);
    }
  }

  @media (max-width: 768px) {
    input {
      height: calc(${(props) => props.$inputHeight} - 0.8rem);
    }
  }

  @media (max-width: 425px) {
    input {
      height: calc(${(props) => props.$inputHeight} - 1rem);
      font-size: 1.4rem;
    }
  }
`;

export default function InputSearch({ size = "medium" }: InputSearchProps) {
  const { inputHeight, inputWidth, imgSize } = sizeStyles[size];

  return (
    <SearchContainer
      $inputHeight={inputHeight}
      $inputWidth={inputWidth}
      $imgSize={imgSize}
    >
      <ItemIcon />
      <input type="text" placeholder="Search...." />
    </SearchContainer>
  );
}
