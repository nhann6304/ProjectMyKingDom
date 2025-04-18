import NavClient from "@/components/navbar/navbar-public/NavClient";
import "./style.scss";
import NavbarPublic from "@/components/navbar/navbar-public/NavbarApi";
import FooterLayout from "@/layouts/public/footer/FooterLayout";

export default function WithLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="public-layout">
            <nav>
                <NavClient />
            </nav>
            {/* // */}
            <main>{children}</main>
            {/* // */}
            <footer>
                <FooterLayout />
            </footer>
        </div>
    );
}
