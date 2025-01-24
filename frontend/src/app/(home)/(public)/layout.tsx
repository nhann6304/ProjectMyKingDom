
import NavbarPublic from "@/app/components/navbar/navbar-public/NavbarPublic";
export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="public-layout">
            <NavbarPublic />
            {children}
        </div>
    );
}