
import Link from "next/link";
import "./style.scss";
import Image from "next/image";
import logo from "@/app/assets/common/logo/logo-res.png";
import MenuAdmin from "@/app/components/menu/menu-admin/MenuAdmin";
import NavbarAdmin from "@/app/components/navbar/navbar-admin/NavbarAdmin";
import UserLayout from "@/app/layouts/admin/users/UserLayout";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="dashboard-layout">
            {/* LEFT */}
            <div className="dashboard-sidebar">
                <Link
                    href={"/"}
                    className="logo"
                >
                    <Image src={logo} width={40} height={40} alt="" />
                    <span className="logo-text">MyKingDom</span>
                </Link>
                <MenuAdmin />
            </div>
            {/* RIGHT */}
            <div className="dashboard-content">
                <NavbarAdmin />
                {children}
            </div>
        </div>
    );
}