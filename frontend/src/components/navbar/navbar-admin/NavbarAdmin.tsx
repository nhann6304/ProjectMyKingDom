"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigations } from "@/config/site";
import styled from "styled-components";

// Styled Component duy nhất cho cả Nav, NavLink, IconWrapper, và NavText
const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* Tương đương với gap-y-1 */
  padding: 0.5rem; /* Tương đương với p-2 */

  a {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem;
    border-radius: 0.375rem;
    background-color: transparent; /* Mặc định là transparent */
    color: #4b5563; /* Màu mặc định */

    &:hover {
      background-color: #cbd5e1; /* Hoặc #334155 nếu dark mode */
    }

    @media (prefers-color-scheme: dark) {
      color: #cbd5e1; /* Màu chữ trong dark mode */

      &:hover {
        background-color: #334155;
      }
    }
  }

  a.active {
    background-color: #e2e8f0;
    color: #1e293b;
  }

  span {
    font-size: 1.4rem; /* Tương đương với text-sm */
    color: inherit; /* Kế thừa màu sắc từ Link */
    font-weight: 600;
  }

  div {
    margin-right: 0.5rem;
  }
`;

export default function NavbarAdmin() {
  const pathname = usePathname();

  return (
    <Navbar>
      {navigations.map((navigation) => {
        const Icon = navigation.icon;
        const isActive = pathname === navigation.href;  // Kiểm tra nếu link đang được chọn

        return (
          <Link
            key={navigation.name}
            href={navigation.href}
            className={isActive ? 'active' : ''}  // Thêm class active nếu là link hiện tại
          >
            <div>
              <Icon size={18} className="text-slate-800 dark:text-slate-200" />
            </div>
            <span>{navigation.name}</span>
          </Link>
        );
      })}
    </Navbar>
  );
}


