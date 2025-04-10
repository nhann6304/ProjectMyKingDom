"use client";

import styled, { css } from "styled-components";
import { useState } from "react";

interface IProps {
  title: string;
}

// Styled button
const ButtonContainer = styled.button<{ $active: boolean }>`
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  width: auto; // 👈 tự động theo content
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

export default function ButtonName({ title }: IProps) {
  const [active, setActive] = useState(false);

  return (
    <ButtonContainer $active={active} onClick={() => setActive(!active)}>
      {title}
    </ButtonContainer>
  );
}
