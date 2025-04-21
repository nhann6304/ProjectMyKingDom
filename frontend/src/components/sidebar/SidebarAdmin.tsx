"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import NavbarAdmin from "../navbar/navbar-admin/NavbarAdmin";
import UserCard from "../cards/CardUser";

// Styled Components với transient props (dấu $)
const ToggleButton = styled.button<{ $isOpen: boolean }>`
    position: fixed;
    top: 3rem;
    left: ${({ $isOpen }) => ($isOpen ? "20rem" : "0")}; 
    z-index: 999;
    padding: 0.375rem 0.5rem;
    border-radius: 0 0.375rem 0.375rem 0;
    background-color: #e2e8f0;
    color: #1e293b;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;

    &:hover {
        background-color: #cbd5e1;
    }

    @media (min-width: 768px) {
        /* Không thay đổi trên màn hình lớn hơn */
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1e293b;
        color: #cbd5e1;

        &:hover {
            background-color: #334155;
        }
    }
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 40;
    height: 100dvh;
    width: ${({ $isOpen }) => ($isOpen ? "20rem" : "4rem")}; /* Khi đóng sẽ thu nhỏ còn 4rem */
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
    background-color: #f1f5f9;
    transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;

    ${({ $isOpen }) => !$isOpen && `transform: translateX(-100%);`} 

    @media (min-width: 768px) {
        position: sticky;
        transform: translateX(0); 
    }

    @media (prefers-color-scheme: dark) {
        background-color: #0f172a;
        border-color: #334155;
    }
`;

const SidebarContent = styled.div<{ $isOpen: boolean }>`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${({ $isOpen }) => ($isOpen ? "1rem 0" : "0")}; /* Thêm khoảng padding khi mở */

    /* Ẩn nội dung khi đóng sidebar */
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.3s ease, visibility 0s 0.3s; /* Làm mượt mà khi ẩn */
`;

const FooterText = styled.div`
    margin-top: auto;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
    color: #94a3b8;

    @media (prefers-color-scheme: dark) {
        color: #64748b;
    }
`;

export default function SidebarAdmin() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Toggle button */}
            <ToggleButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaArrowLeft size={16} /> : <FaArrowRight size={16} />}
            </ToggleButton>

            {/* Sidebar */}
            <Sidebar $isOpen={isOpen}>
                {/* Sidebar content */}
                <SidebarContent $isOpen={isOpen}>
                    <UserCard />
                    <NavbarAdmin />
                    <FooterText>© Admin Panel</FooterText>
                </SidebarContent>
            </Sidebar>
        </>
    );
}
