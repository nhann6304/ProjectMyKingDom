"use client";
import Image from "next/image";
import more from "@/app/assets/common/icons/more.png";
import styled from "styled-components";

const UserCardStyled = styled.div`
  border-radius: var(--border-radius);
  padding: 1rem;
  flex: 1;
  min-width: 130px;
  &:nth-child(odd) {
    background-color: var(--color-purple-400);
  }

  &:nth-child(even) {
    background-color: var(--color-pink-400);
  }

  .user-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: flex;
      font-weight: 600;
      font-size: 1.2rem;
      padding: 5px 1.8rem;
      align-items: center;
      text-align: center;
      border-radius: 8rem;
      color: var(--color-green-500);
      background-color: var(--color-white);
      border: 1px solid var(--color-gray-200);
    }
  }

  .card-number {
    font-size: 3rem;
    font-weight: 600;
    margin: 5px 0;
  }

  .card-type {
    font-size: 2rem;
    font-weight: 500;
    color: #333;
    text-transform: capitalize;
  }
`;

export default function UserCard({ type }: { type: string }) {
  return (
    <UserCardStyled>
      <div className="user-card-header">
        <span className="sheet-time">2024/24/3</span>
        <Image alt="" src={more} width={20} height={20} />
      </div>
      <h1 className="card-number">1,234</h1>
      <h2 className="card-type">{type}</h2>
      {/* <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2> */}
    </UserCardStyled>
  );
}
