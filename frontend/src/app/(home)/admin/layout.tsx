import SidebarAdmin from "@/components/sidebar/SidebarAdmin";
import { Providers } from "@/context/providers";
import "./style.scss";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-background font-sans">
            <Providers>
                <div className="flex min-h-[100dvh]">
                    <SidebarAdmin />
                    <div className="flex-grow overflow-auto">{children}</div>
                </div>
            </Providers>
            {children}
        </div>
    );
}
