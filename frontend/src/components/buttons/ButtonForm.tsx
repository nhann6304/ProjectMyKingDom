"use client";
import { Button } from "antd";
import styled from "styled-components";

interface IPropsButton {
  title: string;
  loading?: boolean; // Mặc định là false
}

const ButtonContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .custom-button {
    align-items: center;
    width: 100%;
    height: 5rem;
    background: var(--color-background-global);
    color: var(--color-white);
    font-weight: 700;
    border: none;
    letter-spacing: 0.04em;
    border-radius: 1.2rem;
    font-size: 1.9rem;
    text-transform: capitalize;
    margin: 3rem 1.7rem 1.2rem 1.7rem;
    transition: all 0.3s ease;

    &:hover {
      background: var(--color-background-global) !important;
      color: var(--color-white) !important;
    }
  }
`;

export default function ButtonForm({ title, loading = false }: IPropsButton) {
  return (
    <ButtonContainer>
      <Button
        className="custom-button"
        htmlType="submit"
        type="default"
        size="large"
        loading={loading}
        disabled={loading} // Khi loading là true thì tự động disabled
      >
        {title}
      </Button>
    </ButtonContainer>
  );
}
