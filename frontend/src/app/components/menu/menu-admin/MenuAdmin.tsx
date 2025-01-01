"use client";

import { menuItems } from "@/app/admin/constants/data/MenuData";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const MenuContainerStyled = styled.div`
    margin-top: 1rem;
    font-size: 0.875rem; 

    .menu-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0 1rem;

        .menu-title {
            display: none;
            color: #9ca3af; 
            font-weight: 300;
            margin: 5px 0;
            font-size : 1.2rem;

            @media screen and (min-width: 1024px) { 
                display: block;
            }
        }

        .menu-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem; 
            color: #6b7280; 
            padding: 0.5rem 0; 
            border-radius: 0.375rem; 

            @media screen and (min-width: 1024px) { 
                justify-content: flex-start;
            }

            &:hover {
                background-color: #e0f2fe; 
            }

            img {
                width: 20px;
                height: 20px;
            }

            span {
                display: none;
                
                @media screen and (min-width: 1024px) { 
                    display: block;
                }
            }
        }
        @media screen and (max-width: 768px) { 
            padding: 0;
        }
    }
`;

export default function MenuAdmin() {
    return (
        <MenuContainerStyled>
            {menuItems.map((section) => (
                <div className="menu-section" key={section.title}>
                    <span className="menu-title">{section.title}</span>
                    {section.items.map((item) => (
                        <Link href={item.href} key={item.label} className="menu-item">
                            <Image src={item.icon} alt={item.label} width={20} height={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </MenuContainerStyled>
    );
}
