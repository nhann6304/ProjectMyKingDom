
import Link from "next/link";
import "./style.scss";
import Image from "next/image";
import MenuAdmin from "@/components/menu/menu-admin/MenuAdmin";
import NavbarAdmin from "@/components/navbar/navbar-admin/NavbarAdmin";
//
import logo from "@/assets/common/logo/logo-res.png";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}