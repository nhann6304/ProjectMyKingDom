"use client";
import Link from "next/link";
import styled, { css } from "styled-components";
import { BiSolidRightArrow } from "react-icons/bi";
import { ArrowRight } from "@/assets/common/icon-public/svg/icon/iconItem";
interface IPropsButton {
    title: string;
    link?: string;
    hoverBg?: boolean;
    icon?: boolean;
}

const ButtonContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const hoverWithBg = ({ $hasIcon }: { $hasIcon: boolean }) => css`
  &:hover {
    background: var(--color-background-global) !important;
    color: ${$hasIcon ? "var(--color-background-global)" : "var(--color-white)"} !important;
  }
`;

const hoverWithoutBg = ({ $hasIcon }: { $hasIcon: boolean }) => css`
  &:hover {
    background: transparent !important;
    color: ${$hasIcon ? "var(--color-background-global)" : "var(--color-black)"} !important;
    box-shadow: var(--color-background-global) 0px 0px 0px 0.5px;
  }
`;

const StyledLink = styled(Link) <{ $hoverBg: boolean; $hasIcon: boolean }>`
  margin: 1rem 5px 2rem 5px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.4rem;
  gap: 2px;
  color: ${({ $hasIcon }) =>
        $hasIcon ? "var(--color-background-global)" : "var(--color-black)"};
  font-weight: ${({ $hasIcon }) =>
        $hasIcon ? "600" : "500"};
  font-size: ${({ $hasIcon }) =>
        $hasIcon ? "1.8rem" : "2.2rem"};
  text-transform: capitalize;
  border: 3px solid var(--color-background-global);
  border-radius: 2rem;
  padding: 4px ${({ $hasIcon }) => ($hasIcon ? "2.4rem" : "2rem")};
  transition: background 0.3s, color 0.3s;
  ${({ $hoverBg }) => ($hoverBg ? hoverWithBg : hoverWithoutBg)}

  svg {
    font-size: 1.6rem;
    transform: rotate(-90deg);
  }
`;

export default function ButtonCommon({
    title,
    link,
    hoverBg = true,
    icon,
}: IPropsButton) {
    return (
        <ButtonContainer>
            <StyledLink href={link ? link : "#"} $hoverBg={hoverBg} $hasIcon={!!icon}>
                {title}
                {icon && <ArrowRight />}
            </StyledLink>
        </ButtonContainer>
    );
}
