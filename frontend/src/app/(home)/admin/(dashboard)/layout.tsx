
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