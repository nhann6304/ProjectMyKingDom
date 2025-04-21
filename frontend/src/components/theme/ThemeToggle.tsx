"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Dropdown, Menu } from "antd";
import "antd/dist/reset.css"; // nếu cần reset style Ant Design
// import "./theme-toggle.css"; // optional: custom CSS nếu muốn
import { useHydration } from "@/hooks/useHydration";
import { SunburstChart } from "recharts";
import { BiMoon } from "react-icons/bi";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const hydrated = useHydration();

    const menu = (
        <Menu
            items={[
                {
                    key: "light",
                    label: <span className="text-black dark:text-white">Light</span>,
                    onClick: () => setTheme("light"),
                },
                {
                    key: "dark",
                    label: <span className="text-black dark:text-white">Dark</span>,
                    onClick: () => setTheme("dark"),
                },
                {
                    key: "system",
                    label: <span className="text-black dark:text-white">System</span>,
                    onClick: () => setTheme("system"),
                },
            ]}
        />
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                <SunburstChart className="h-5 w-5 text-yellow-500 transition-all dark:-rotate-90 dark:scale-0" />
                <BiMoon className="absolute h-5 w-5 text-gray-800 dark:text-yellow-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                {hydrated && theme === "system" && <AutoThemeBadge />}
                <span className="sr-only">Toggle theme</span>
            </button>
        </Dropdown>
    );
}

function AutoThemeBadge() {
    return (
        <span className="absolute -right-2 -top-2 flex h-4 items-center rounded-full bg-gray-400 dark:bg-gray-600 px-1.5 text-[0.6rem] text-white ring-2 ring-white dark:ring-gray-900 transition-all animate-in zoom-in-50">
            auto
        </span>
    );
}
