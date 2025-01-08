"use client";
import styled from "styled-components";
import InputSearch from "../../inputs/input-search";

const SearchTableContainer = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function SearchTable() {
  return (
    <SearchTableContainer>
      <InputSearch />
    </SearchTableContainer>
  )
}
