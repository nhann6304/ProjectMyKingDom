"use client";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import avatar from "@/assets/models/avatar/nhan.png";
import styled from "styled-components";

// Styled Component duy nhất
const UserCardWrapper = styled.div`
  display: flex;
  height: 7rem; /* Tương đương với h-28 trong Tailwind */
  align-items: center;
  border-bottom: 1px solid #e5e7eb; /* Hoặc sử dụng màu của bạn cho border */
  padding-left: 1rem;
  padding-right: 1rem;

  .card-content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.375rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    &:hover {
      background-color: #e2e8f0; /* Hoặc #cbd5e1 nếu bạn muốn hover sáng hơn */
    }
    @media (prefers-color-scheme: dark) {
      &:hover {
        background-color: #2d3748; /* Tối hơn cho chế độ dark */
      }
    }

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        margin-right: 1rem;
        border-radius: 50%;
      }

      .user-details {
        display: flex;
        flex-direction: column;
        .user-name {
          font-size: 1.4rem; 
          font-weight: 500;
        }

        .user-role {
          font-size:1.2rem; /* Tương đương với text-sm */
          color: #94a3b8; /* Màu nhạt cho role */
        }
      }
    }

    .arrow-icon {
      font-size: 1.4rem; /* Tương đương với size={20} */
    }
  }
`;

export default function UserCard() {
  return (
    <UserCardWrapper>
      <div className="card-content">
        <div className="user-info">
          <Image
            src={avatar}
            alt="User"
            className="avatar"
            width={50}  // Tăng kích thước của avatar
            height={50} // Tăng kích thước của avatar
            priority
          />
          <div className="user-details">
            <span className="user-name">Name</span>
            <span className="user-role">Agent Admin</span>
          </div>
        </div>
        <BiChevronDown size={20} className="arrow-icon" />
      </div>
    </UserCardWrapper>
  );
}
