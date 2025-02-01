import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import ToasterDisplay from "@/components/notifications/toaster/ToasterDisplay";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToasterDisplay />
      </body>
    </html>
  );
}
