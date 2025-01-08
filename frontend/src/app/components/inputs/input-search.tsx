"use client";
import search from "@/app/assets/common/icons/search.png";
import Image from "next/image";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  padding: 0 1rem;
  border-radius: 2rem;
  border: 1.5px solid var(--color-gray-300);
  gap: 1rem;
  input {
    height: 3rem;
    width: 15rem;
    padding: 0.5rem;
    font-size: 2.2rem;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.4rem;

    &::placeholder {
      color: #9ca3af;
    }
  }

  img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export default function InputSearch() {
    return (
        <SearchContainer>
            <Image src={search} alt="search" />
            <input type="text" placeholder="Search...." />
        </SearchContainer>
    );
}
