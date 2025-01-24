import React from "react";
import "./style.scss"
interface IProp {
    children: React.ReactNode,
}

export default function DropdownNav({ children }: IProp) {
    return (
        <div className="dropdown-menu">
            <div className="menu-container container-pub">{children}</div>
        </div>
    )
}
