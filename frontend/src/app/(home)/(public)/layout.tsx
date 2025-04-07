import ScrollTopButton from "@/components/buttons/ButtonScrollTop";
import ChatContact from "@/components/chat/ChatContact";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ScrollTopButton />
            <div className="public-layout">{children}</div>
            <ChatContact />
        </>
    )
}
