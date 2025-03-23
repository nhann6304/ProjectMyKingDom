import NavbarPublic from "@/components/navbar/navbar-public/NavbarPublic";

export default function WithLayout({
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