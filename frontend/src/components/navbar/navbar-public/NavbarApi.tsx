"use client";

import { useState, useEffect } from "react";
import BottomNav from "./bottom-nav/BottomNav";
import TopNavPublic from "./top-nav/TopNav";

interface IProps {
    categories: any;
}

export default function NavbarApi({ categories }: IProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showBottomNav, setShowBottomNav] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (currentScrollY > lastScrollY && currentScrollY > 50) {
                        setIsVisible(false);
                        setShowBottomNav(false);
                    } else {
                        setIsVisible(true);
                        setTimeout(() => setShowBottomNav(true), 200); // BottomNav xuất hiện sau TopNav 200ms
                    }

                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`fixed top-0 left-0 w-full  bg-white shadow-md z-50 transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            {/* TopNav hiện trước */}
            <div className="transition-transform duration-500 translate-y-0">
                <TopNavPublic background="var(--color-blue-global)" />
            </div>

            {/* BottomNav xuất hiện sau TopNav 200ms */}
            <div
                className={`transition-transform duration-500 ${showBottomNav ? "translate-y-0" : "-translate-y-0"
                    }`}
            >
                <BottomNav categories={categories} />
            </div>
        </div>
    );
}
