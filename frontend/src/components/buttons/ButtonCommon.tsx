"use client";
import Link from "next/link";
import styled, { css } from "styled-components";
import { ArrowRight } from "@/assets/common/icon-public/svg/icon/iconItem";

interface IPropsButton {
  title: string; // tiêu đề
  link?: string;// Đường dẫn
  hoverBg?: boolean; // Hover vào có viền k có bg
  icon?: boolean; // hiện icon k 
  background?: boolean; // tô bg màu global
  customIcon?: React.ReactNode; // Cho phép truyền icon tuỳ chỉnh
  iconPosition?: "left" | "right"; // Vị trí của icon
}

const ButtonContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const hoverWithBg = css<{ $hasIcon: boolean }>`
  &:hover {
    background: var(--color-background-global) !important;
    color: ${({ $hasIcon }) =>
    $hasIcon ? "var(--color-background-global)" : "var(--color-white)"} !important;
  }
`;

const hoverWithoutBg = css<{ $hasIcon: boolean }>`
  &:hover {
    background: transparent !important;
    color: ${({ $hasIcon }) =>
    $hasIcon ? "var(--color-background-global)" : "var(--color-black)"} !important;
    box-shadow: var(--color-background-global) 0px 0px 0px 0.5px;
  }
`;

const StyledLink = styled.a<{
  $hoverBg: boolean;
  $hasIcon: boolean;
  $background: boolean;
}>`
  margin: 1rem 5px 2rem 5px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.4rem;
  gap: 6px; // Tăng khoảng cách giữa icon và text
  background-color: ${({ $background }) =>
    $background ? "var(--color-background-global)" : "transparent"};
  color: ${({ $hasIcon, $background }) =>
    $background ? "var(--color-white)" : $hasIcon ? "var(--color-background-global)" : "var(--color-black)"};
  font-weight: ${({ $hasIcon }) => ($hasIcon ? "600" : "500")};
  font-size: ${({ $hasIcon }) => ($hasIcon ? "1.8rem" : "2rem")};
  text-transform: capitalize;
  border: 3px solid var(--color-background-global);
  border-radius: 2rem;
  padding: 4px ${({ $hasIcon }) => ($hasIcon ? "2.4rem" : "2rem")};
  transition: background 0.3s, color 0.3s;
  ${({ $hoverBg }) => ($hoverBg ? hoverWithBg : hoverWithoutBg)}

  // Chỉ xoay ArrowRight, không xoay customIcon
  svg[data-icon="arrow-right"] {
    transform: rotate(-90deg);
  }

  svg {
    font-size: 1.6rem;
  }
`;

export default function ButtonCommon({
  title,
  link,
  background = false,
  hoverBg = true,
  icon,
  customIcon,
  iconPosition = "right", // Mặc định icon nằm bên phải
}: IPropsButton) {
  return (
    <ButtonContainer>
      <Link href={link ? link : "#"} passHref legacyBehavior>
        <StyledLink $hoverBg={hoverBg} $hasIcon={!!icon} $background={!!background}>
          {icon && iconPosition === "left" && (customIcon || <ArrowRight data-icon="arrow-right" />)}
          {title}
          {icon && iconPosition === "right" && (customIcon || <ArrowRight data-icon="arrow-right" />)}
        </StyledLink>
      </Link>
    </ButtonContainer>
  );
}
