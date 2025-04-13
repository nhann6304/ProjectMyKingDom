"use client";

import styled, { css } from "styled-components";
import { useState } from "react";

interface IProps {
  title: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: (tag: string) => void;
}

// Styled button
const ButtonContainer = styled.button<{ $active: boolean }>`
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  width: auto;
  font-weight: 700;
  text-transform: capitalize;
  ${(props) =>
    props.$active
      ? css`
          background-color: var(--color-background-global);
          color: white;
          border: 2px solid var(--color-background-global);
        `
      : css`
          background-color: #f2f2f2;
          color: var(--color-background-global);
          border: 2px solid #f2f2f2;
        `}
`;

export default function ButtonName({
  title,
  isActive = false,
  disabled = false,
  onClick,
}: IProps) {

  const handleClick = () => {
    onClick?.(title);
  };

  return (
    <ButtonContainer
      disabled={disabled}
      $active={isActive}
      onClick={() => handleClick()} // 👈 Không cần event nữa
    >
      {title}
    </ButtonContainer>
  );
}
